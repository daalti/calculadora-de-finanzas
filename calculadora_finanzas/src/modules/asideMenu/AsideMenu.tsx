import { Label } from "../../components/tremor/Label";
import { Link } from "react-router-dom";
import calculatorData from "../../assets/calculator/calculator.json";
import blogData from "../../assets/blogs/blog.json";
import tesisData from "../../assets/tesis/tesis.json";
import "./AsideMenu.css";

interface Props {}

export const AsideMenu: React.FC<Props> = () => {
  return (
    <aside className="aside-container">
      <div className="aside-menu">
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
      </div>
    </aside>
  );
};
