import logo from "../../assets/logo/logo.svg";
import "./MenuNav.css";
import { DropdownMenu, DropdownMenuTrigger } from "../tremor/DropDownMenu";
import { DropdownMenuHero } from "../drowDownMenuHero/DropDownMenuHero";

export const MenuNav = () => (
  <div className="tab-menu-container-wraper">
    <nav className="tab-menu-container">
      <div>
        <img className="tab-menu-logo" src={logo} alt="Logo" />
      </div>
      <ul className="tab-menu-navigation">
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <a href="#" className="tab-menu-link">
                Calculadoras
              </a>
            </DropdownMenuTrigger>
            <DropdownMenuHero />
          </DropdownMenu>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <a href="#" className="tab-menu-link">
                Glosario
              </a>
            </DropdownMenuTrigger>
            <DropdownMenuHero />
          </DropdownMenu>
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
);
