import { TabNavigation, TabNavigationLink } from "../tremor/TabNavigation";
import logo from "../../assets/logo/logo.svg";
import "./TabMenu.css";

export const TabMenu = () => (
  <div className="tab-menu-container-wraper">
    <div className="tab-menu-container">
      <div>
        <img className="tab-menu-logo" src={logo} alt="Logo" />
      </div>
      <TabNavigation className="tab-menu-navigation">
        <TabNavigationLink href="#" active>
          Calculadoras
        </TabNavigationLink>
        <TabNavigationLink href="#">Glosario</TabNavigationLink>
        <TabNavigationLink href="#">Libros</TabNavigationLink>
      </TabNavigation>
    </div>
  </div>
);
