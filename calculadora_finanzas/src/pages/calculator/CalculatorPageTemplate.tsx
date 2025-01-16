import { MenuNav } from "../../modules/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { ChartCard } from "../../modules/chartCard/ChartCard";
import { ChartCardPresentValue } from "../../modules/chartCard/ChartCardPresentValues";
import { ChartCardReturnRate } from "../../modules/chartCard/ChartCardReturnRate";
import { ChartCardAverageStock } from "../../modules/chartCard/ChartCardAverageStock";
import { ChartCardIRPF } from "../../modules/chartCard/ChartCardIRPF";
import { CalloutMessage } from "../../modules/callOut/CallOut";
import { FooterPage } from "../../modules/footer/Footer";
import "./CalculatorPageTemplate.css";

interface Props {
  title: string;
  message: React.ReactNode;
  type:
    | "compoundInterest"
    | "presentValue"
    | "returnRate"
    | "averageStock"
    | "IRPF";
}

export const CalculatorPageTemplate: React.FC<Props> = ({
  title,
  message,
  type,
}) => {
  return (
    <div className="compound-interest">
      <MenuNav />
      <div className="compound-interest-main">
        <div className="compound-interest-content-container">
          <main className="compound-interest-content">
            <h1 className="compound-interest-title">{title}</h1>
            <CalloutMessage message={message} title={title} variant="default" />
            {type === "compoundInterest" ? <ChartCard /> : null}
            {type === "presentValue" ? <ChartCardPresentValue /> : null}
            {type === "returnRate" ? <ChartCardReturnRate /> : null}
            {type === "averageStock" ? <ChartCardAverageStock /> : null}
            {type === "IRPF" ? <ChartCardIRPF /> : null}
          </main>
          <AsideMenu />
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
