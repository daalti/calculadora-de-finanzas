import { MenuNav } from "../../components/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { ChartCard } from "../../modules/chartCard/ChartCard";
import { CalloutMessage } from "../../modules/callOut/CallOut";
import { FooterPage } from "../../components/footer/Footer";
import "./CompoundInterest.css";

const COMPOUND_INTEREST_MESSAGE = (
  <>
    Con una inversión mensual de <strong>300€</strong> durante{" "}
    <strong>35</strong> años y una revalorización del
    <strong> 10%</strong> anual conseguirás acumular más de
    <strong> 1.000.000€</strong> Selecciona en la calculadora de interés
    compuesto tus posibilidades de ahorro e inversión y descubre cuánto podrás
    acumular. Puede usarse para cualquier tipo de activo:{" "}
    <strong>fondos indexados, ETFs, acciones, cryptos, etc.</strong>
  </>
);

interface Props {}

export const CompoundInterest: React.FC<Props> = () => {
  return (
    <div className="compound-interest">
      <header className="compound-interest-header">
        <MenuNav />
      </header>
      <div className="compound-interest-main">
        <div className="compound-interest-content-container">
          <h1 className="compound-interest-title">
            Calculadora Interes Compuesto
          </h1>
          <CalloutMessage
            message={COMPOUND_INTEREST_MESSAGE}
            title="Interés Compuesto"
            variant="default"
          />
          <main className="compound-interest-content">
            <AsideMenu />
            <ChartCard />
          </main>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
