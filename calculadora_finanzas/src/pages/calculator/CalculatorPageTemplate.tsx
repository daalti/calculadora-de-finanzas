import { MenuNav } from "../../modules/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { ChartCard } from "../../modules/chartCard/ChartCard";
import { ChartCardPresentValue } from "../../modules/chartCard/ChartCardPresentValues";
import { CalloutMessage } from "../../modules/callOut/CallOut";
import { FooterPage } from "../../modules/footer/Footer";
import "./CalculatorPageTemplate.css";

interface Props {
  title: string;
  message: React.ReactNode;
  type: "compoundInterest" | "presentValue";
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
          <h1 className="compound-interest-title">{title}</h1>
          <CalloutMessage message={message} title={title} variant="default" />
          <main className="compound-interest-content">
            <AsideMenu />
            {type === "compoundInterest" ? <ChartCard /> : null}
            {type === "presentValue" ? <ChartCardPresentValue /> : null}
          </main>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
