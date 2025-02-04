import { useEffect, useState } from "react";
import { Card } from "../../components/tremor/Card";
import { useNavigate } from "react-router-dom";
import "./ChartBlogInitial.css";

// Función para obtener los datos del blog desde public
const getBlogData = async () => {
  const response = await fetch("/assets/blogs/blog.json");
  const data = await response.json();
  return data;
};

interface Props {}

export const ChartBlogInitial: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await getBlogData();
      // Si blogs no es un array, se convierte en array usando Object.values
      const blogsArray = Array.isArray(blogs) ? blogs : Object.values(blogs);
      setBlogData(blogsArray);
    };

    fetchData();
  }, []);

  return (
    <div className="compound-interest-card-container">
      {blogData.map((data, index) => (
        <Card
          key={data.titulo}
          className="compound-interest-card"
          onClick={() => navigate(data.link)}
          style={{ cursor: "pointer" }}
        >
          <div className="calculator-card-content">
            <img
              src={`/assets/blogs/images/blog-${index + 1}.webp`}
              alt={data.titulo}
              className="calculator-card-image"
            />
            <div className="calculator-card-text">
              <h2>{data.titulo}</h2>
              <p>{data.descripcion}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
