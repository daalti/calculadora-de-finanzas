import { useEffect, useState } from "react";
import { Label } from "../../components/tremor/Label";
import { Link } from "react-router-dom";
import calculatorData from "../../assets/calculator/calculator.json";
import tesisData from "../../assets/tesis/tesis.json";
import "./AsideMenu.css";

// Función para obtener los datos del blog desde public
const getBlogData = async () => {
  const response = await fetch("/assets/blogs/blog.json");
  const data = await response.json();
  return data;
};

interface Props {}

export const AsideMenu: React.FC<Props> = () => {
  const [blogData, setBlogData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await getBlogData();
      setBlogData(blogs);
    };

    fetchData();
  }, []);

  return (
    <aside className="aside-container">
      <div className="aside-menu">
        <div>
          <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>Blogs</h3>
          <ul className="aside-menu-ul">
            {Object.values(blogData).map((blog) => (
              <li key={blog.titulo}>
                <Label>
                  <Link to={blog.link}>{blog.titulo}</Link>
                </Label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>
            Tesis de Inversión
          </h3>
          <ul className="aside-menu-ul">
            {Object.values(tesisData).map((tesis) => (
              <li key={tesis.titulo}>
                <Label>
                  <Link to={tesis.link}>{tesis.titulo}</Link>
                </Label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>
            Calculadoras
          </h3>
          <ul className="aside-menu-ul">
            {Object.values(calculatorData).map((calculator) => (
              <li key={calculator.titulo}>
                <Label>
                  <Link to={calculator.link}>{calculator.titulo}</Link>
                </Label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
