import { useEffect, useState } from "react";
import { Label } from "../../components/tremor/Label";
import { Link } from "react-router-dom";
import "./AsideMenu.css";

// Función para obtener los datos del blog desde public
const getBlogData = async () => {
  const response = await fetch("/assets/blogs/blog.json");
  const data = await response.json();
  return data;
};

// Función para obtener los datos de las calculadoras desde public
const getCalculatorData = async () => {
  const response = await fetch("/assets/calculator/calculator.json");
  const data = await response.json();
  return data;
};

// Función para obtener los datos de tesis desde public
const getTesisData = async () => {
  const response = await fetch("/assets/tesis/tesis.json");
  const data = await response.json();
  return data;
};

interface Props {}

export const AsideMenu: React.FC<Props> = () => {
  const [blogData, setBlogData] = useState<any[]>([]);
  const [calculatorData, setCalculatorData] = useState<any[]>([]);
  const [tesisData, setTesisData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await getBlogData();
      const calculators = await getCalculatorData();
      const tesis = await getTesisData();

      // Asegúrate de que los datos sean arrays
      setBlogData(Array.isArray(blogs) ? blogs : Object.values(blogs));
      setCalculatorData(
        Array.isArray(calculators) ? calculators : Object.values(calculators)
      );
      setTesisData(Array.isArray(tesis) ? tesis : Object.values(tesis));
    };

    fetchData();
  }, []);

  return (
    <aside className="aside-container">
      <div className="aside-menu">
        <div>
          <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>
            <Label>Blogs</Label>
          </h3>
          <ul className="aside-menu-ul">
            {blogData.map((blog) => (
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
            <Label>Tesis de Inversión</Label>
          </h3>
          <ul className="aside-menu-ul">
            {tesisData.map((tesis) => (
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
            <Label>Calculadoras</Label>
          </h3>
          <ul className="aside-menu-ul">
            {calculatorData.map((calculator) => (
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
