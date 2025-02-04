import { Link } from "react-router-dom";
import calculatorData from "../../assets/calculator/calculator.json";
import blogData from "../../../public/assets/blogs/blog.json";
import tesisData from "../../assets/tesis/tesis.json";
import logo from "../../assets/logo/logo.svg";
import "./Footer.css";

export const FooterPage: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <div className="footer-top">
            <img
              src={logo}
              alt="Calculadora Finanzas Logo"
              className="footer-logo"
            />
          </div>
          <div className="footer-section">
            <h3>Calculadoras</h3>
            <ul>
              {Object.values(calculatorData).map((calculator) => (
                <li key={calculator.titulo}>
                  <Link to={calculator.link}>{calculator.titulo}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Blog</h3>
            <ul>
              {Object.values(blogData).map((blog) => (
                <li key={blog.titulo}>
                  <Link to={blog.link}>{blog.titulo}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Tesis</h3>
            <ul>
              {Object.values(tesisData).map((tesis) => (
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
              <img src="/src/assets/footer/linkdin.webp" alt="LinkedIn" />
            </a>
            <a
              href="https://x.com/daaltigo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/src/assets/footer/x.webp" alt="X" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/src/assets/footer/youtube.png" alt="YouTube" />
            </a>
            <a
              href="https://alonsod.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/src/assets/footer/substack.png" alt="Substack" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
