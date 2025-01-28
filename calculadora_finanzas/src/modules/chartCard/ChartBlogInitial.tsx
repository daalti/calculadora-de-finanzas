import { Card } from "../../components/tremor/Card";
import blogData from "../../assets/blogs/blog.json";
import { useNavigate } from "react-router-dom";
import "./ChartBlogInitial.css";

interface Props {}

export const ChartBlogInitial: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="compound-interest-card-container">
      {Object.values(blogData).map((data, index) => (
        <Card
          key={data.titulo}
          className="compound-interest-card"
          onClick={() => navigate(data.link)}
          style={{ cursor: "pointer" }}
        >
          <div className="calculator-card-content">
            <img
              src={`/src/assets/blogs/images/blog-${index + 1}.webp`}
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
