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
            <li>
              <Label>
                <a href="/calculadora-IRPF-2025">Calculadora IRPF 2025</a>
              </Label>
            </li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>Glosario</h3>
          <ul className="aside-menu-ul">
            <li>
              <Label>
                <a href="/venture-capital">Venture Capital</a>
              </Label>
            </li>
            <li>
              <Label>
                <a href="/interes-compuesto">Interés compuesto</a>
              </Label>
            </li>
            <li>
              <Label>
                <a href="/tramos-irpf">Tramos IRPF</a>
              </Label>
            </li>
          </ul>
        </div>
      </Card>
    </aside>
  );
};
