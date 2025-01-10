import { MenuNav } from "../../components/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { ChartCard } from "../../modules/chartCard/ChartCard";
import { CalloutMessage } from "../../modules/callOut/CallOut";
import { FooterPage } from "../../components/footer/Footer";
import "./CompoundInterest.css";

interface Props {}

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
          <CalloutMessage />
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
