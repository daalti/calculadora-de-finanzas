import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

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

export const FooterPage: React.FC = () => {
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
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <div className="footer-top">
            <img alt="Calculadora Finanzas Logo" className="footer-logo" />
          </div>

          <div className="footer-section">
            <h3>Calculadoras</h3>
            <ul>
              {calculatorData.map((calculator) => (
                <li key={calculator.titulo}>
                  <Link to={calculator.link}>{calculator.titulo}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Blog</h3>
            <ul>
              {blogData.map((blog) => (
                <li key={blog.titulo}>
                  <Link to={blog.link}>{blog.titulo}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Tesis</h3>
            <ul>
              {tesisData.map((tesis) => (
                <li key={tesis.titulo}>
                  <Link to={tesis.link}>{tesis.titulo}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social">
            <a
              href="https://www.linkedin.com/in/daniel-alonso-427b5173/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/footer/linkdin.webp" alt="LinkedIn" />
            </a>
            <a
              href="https://x.com/daaltigo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/footer/x.webp" alt="X" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/footer/youtube.png" alt="YouTube" />
            </a>
            <a
              href="https://alonsod.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/footer/substack.png" alt="Substack" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
