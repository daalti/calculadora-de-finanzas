import logo from "../../assets/logo/logo.svg";
import "./MenuNav.css";

export const MenuNav = () => (
  <div className="tab-menu-container-wraper">
    <nav className="tab-menu-container">
      <div>
        <img className="tab-menu-logo" src={logo} alt="Logo" />
      </div>
      <ul className="tab-menu-navigation">
        <li>
          <a href="#" className="tab-menu-link">
            Calculadoras
          </a>
        </li>
        <li>
          <a href="#" className="tab-menu-link">
            Glosario
          </a>
        </li>
        <li>
          <a href="#" className="tab-menu-link">
            Libros
          </a>
        </li>
      </ul>
    </nav>
  </div>
);
