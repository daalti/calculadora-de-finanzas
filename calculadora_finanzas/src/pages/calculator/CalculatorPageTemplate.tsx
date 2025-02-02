import { MenuNav } from "../../modules/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { ChartCard } from "../../modules/chartCard/ChartCard";
import { ChartCardPresentValue } from "../../modules/chartCard/ChartCardPresentValues";
import { ChartCardReturnRate } from "../../modules/chartCard/ChartCardReturnRate";
import { ChartCardAverageStock } from "../../modules/chartCard/ChartCardAverageStock";
import { ChartCardIRPF } from "../../modules/chartCard/ChartCardIRPF";
import { ChartCardInitial } from "../../modules/chartCard/ChartCardInitial";
import { ChartCardIRPFComparison } from "../../modules/chartCard/ChartCardIRPFComparison";
import { ChartCardLaboralCost } from "../../modules/chartCard/ChartCardLaboralCost";
import { ChartBlogInitial } from "../../modules/chartCard/ChartBlogInitial";
import { ChartGlosaryInitial } from "../../modules/chartCard/ChartGlosaryInitial";
import { ChartTesisInitial } from "../../modules/chartCard/ChartTesisInitial";
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
    | "IRPF"
    | "initial"
    | "IRPFCA"
    | "laboralCost"
    | "BlogInitial"
    | "TesisInitial"
    | "GlosarioInitial";
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
          <AsideMenu />
          <main
            className="compound-interest-content"
            style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}
          >
            <h1 className="compound-interest-title">{title}</h1>
            <CalloutMessage message={message} title={title} variant="default" />
            {type === "compoundInterest" ? <ChartCard /> : null}
            {type === "presentValue" ? <ChartCardPresentValue /> : null}
            {type === "returnRate" ? <ChartCardReturnRate /> : null}
            {type === "averageStock" ? <ChartCardAverageStock /> : null}
            {type === "IRPF" ? <ChartCardIRPF /> : null}
            {type === "initial" ? <ChartCardInitial /> : null}
            {type === "IRPFCA" ? <ChartCardIRPFComparison /> : null}
            {type === "laboralCost" ? <ChartCardLaboralCost /> : null}
            {type === "BlogInitial" ? <ChartBlogInitial /> : null}
            {type === "TesisInitial" ? <ChartTesisInitial /> : null}
            {type === "GlosarioInitial" ? <ChartGlosaryInitial /> : null}
          </main>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
