import logo from "../../assets/logo/logo.svg";
import "./MenuNav.css";

export const MenuNav = () => (
  <header className="compound-interest-header">
    <div className="tab-menu-container-wraper">
      <nav className="tab-menu-container">
        <div>
          <a href="/">
            <img className="tab-menu-logo" src={logo} alt="Logo" />
          </a>
        </div>
        <ul className="tab-menu-navigation">
          <li>
            <a href="/calculadoras" className="tab-menu-link">
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
          <li>
            <a href="#" className="tab-menu-link">
              Blog
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);
