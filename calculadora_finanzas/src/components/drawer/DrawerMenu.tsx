import { Label } from "../../components/tremor/Label";
import { Link } from "react-router-dom";
import calculatorData from "../../assets/calculator/calculator.json";
import blogData from "../../assets/blogs/blog.json";
import tesisData from "../../assets/tesis/tesis.json";
import logo from "../../assets/logo/logo.svg";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../tremor/Drawer";
import "./DrawerMenu.css";

export const DrawerMenu: React.FC = () => {
  return (
    <div className="flex justify-center nav-box-container-mobile-menu">
      <Drawer>
        <DrawerTrigger asChild>
          <button>
            <svg
              className="nav-box-icon-mobile"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="undefined"
              viewBox="0 -960 960 960"
            >
              <path d="M120-240v-80h720v80zm0-200v-80h720v80zm0-200v-80h720v80z"></path>
            </svg>
          </button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-lg" style={{ zIndex: 999 }}>
          <DrawerHeader>
            <DrawerTitle>
              <a href="/">
                <img
                  className="tab-menu-logo-mobile-menu"
                  src={logo}
                  alt="Logo"
                />
              </a>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="aside-menu">
              <div>
                <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>
                  Blogs
                </h3>
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
              <div>
                <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>
                  <a href="/glosario" className="tab-menu-link">
                    Glosario
                  </a>
                </h3>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
