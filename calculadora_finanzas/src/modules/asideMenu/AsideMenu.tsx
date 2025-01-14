import { Card } from "../../components/tremor/Card";
import { Label } from "../../components/tremor/Label";
import { Link } from "react-router-dom";
import "./AsideMenu.css";

interface Props {}

export const AsideMenu: React.FC<Props> = () => {
  return (
    <aside>
      <Card className="aside-menu">
        <div>
          <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>
            Calculadoras
          </h3>
          <ul className="aside-menu-ul">
            <li>
              <Label>
                <Link to="/valor-presente">Calculadora Valor Presente</Link>
              </Label>
            </li>
            <li>
              <Label>
                <a href="/tasa-de-retorno">
                  Calculadora Tasa de Retorno (CAGR)
                </a>
              </Label>
            </li>
            <li>
              <Label>
                <a href="/promedio-acciones">Promedio Acciones</a>
              </Label>
            </li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>
            Artículos de interes
          </h3>
          <ul className="aside-menu-ul">
            <li>
              <Label>
                <a href="#">Savings Goal Calculator</a>
              </Label>
            </li>
            <li>
              <Label>
                <a href="#">Required Minimum Distribution Calculator</a>
              </Label>
            </li>
            <li>
              <Label>
                <a href="#">College Savings Calculator</a>
              </Label>
            </li>
          </ul>
        </div>
      </Card>
    </aside>
  );
};
