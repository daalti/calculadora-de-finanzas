import { MenuNav } from "../../components/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { ChartCardPresentValue } from "../../modules/chartCard/ChartCardPresentValues";
import { CalloutMessage } from "../../modules/callOut/CallOut";
import { FooterPage } from "../../components/footer/Footer";
import "./PresentValue.css";

interface Props {}

const COMPOUND_INTEREST_MESSAGE = (
  <>
    <p>
      El valor presente (PV) es un concepto financiero clave que permite
      calcular cuánto deberíamos invertir hoy para alcanzar una cantidad
      específica en el futuro, considerando una tasa de interés determinada.
      Este principio es fundamental en áreas como la valoración de inversiones,
      proyectos y acciones.
    </p>
    <br />
    <p>
      Supongamos que quieres tener <strong>10,000€</strong> dentro de 5 años y
      la tasa de interés anual es del 5%. Usando la fórmula del valor presente:
    </p>
    <br />
    <p>
      Esto significa que, si inviertes aproximadamente{" "}
      <strong>7,835.26€ </strong> hoy al <strong>5% anual</strong>, tendrás{" "}
      <strong>10,000€</strong> en 5 años.
    </p>
  </>
);

export const PresentValue: React.FC<Props> = () => {
  return (
    <div className="compound-interest">
      <header className="compound-interest-header">
        <MenuNav />
      </header>
      <div className="compound-interest-main">
        <div className="compound-interest-content-container">
          <h1 className="compound-interest-title">
            Calculadora Valor Presente
          </h1>
          <CalloutMessage
            message={COMPOUND_INTEREST_MESSAGE}
            title="Interés Compuesto"
            variant="default"
          />
          <main className="compound-interest-content">
            <AsideMenu />
            <ChartCardPresentValue />
          </main>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
