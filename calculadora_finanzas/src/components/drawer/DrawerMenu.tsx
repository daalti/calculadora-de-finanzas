import { useEffect, useState } from "react";
import { Label } from "../../components/tremor/Label";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../tremor/Drawer";
import "./DrawerMenu.css";

// Función para obtener los blogs
const getBlogData = async () => {
  const response = await fetch("/assets/blogs/blog.json");
  const data = await response.json();
  return data;
};

// Función para obtener los datos de las calculadoras
const getCalculatorData = async () => {
  const response = await fetch("/assets/calculator/calculator.json");
  const data = await response.json();
  return data;
};

// Función para obtener los datos de tesis
const getTesisData = async () => {
  const response = await fetch("/assets/tesis/tesis.json");
  const data = await response.json();
  return data;
};

export const DrawerMenu: React.FC = () => {
  const [blogData, setBlogData] = useState<any[]>([]);
  const [calculatorData, setCalculatorData] = useState<any[]>([]);
  const [tesisData, setTesisData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Carga los blogs
      const blogs = await getBlogData();
      const blogsArray = Array.isArray(blogs) ? blogs : Object.values(blogs);
      setBlogData(blogsArray);

      // Carga las calculadoras
      const calculators = await getCalculatorData();
      const calculatorsArray = Array.isArray(calculators)
        ? calculators
        : Object.values(calculators);
      setCalculatorData(calculatorsArray);

      // Carga las tesis
      const tesis = await getTesisData();
      const tesisArray = Array.isArray(tesis) ? tesis : Object.values(tesis);
      setTesisData(tesisArray);
    };

    fetchData();
  }, []);

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
              {/* Sección de Blogs */}
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
              {/* Sección de Tesis */}
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
              {/* Sección de Calculadoras */}
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
              {/* Enlace a Glosario */}
              <div>
                <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>
                  <a href="/glosario" className="tab-menu-link">
                    <Label>Glosario</Label>
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
