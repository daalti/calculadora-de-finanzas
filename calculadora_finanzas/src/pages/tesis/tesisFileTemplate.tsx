import { MenuNav } from "../../modules/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { FooterPage } from "../../modules/footer/Footer";
import { MarkDownTextTesis } from "./MarkDownTextTesis";
import "./tesisFileTemplate.css";

interface Props {
  title: string;
}

export const TesisFileTemplate: React.FC<Props> = ({ title }) => {
  return (
    <div className="glosario-file-template">
      <MenuNav />
      <div className="glosario-file-template-main">
        <div className="glosario-file-template-content">
          <AsideMenu />
          <main>
            <MarkDownTextTesis title={title} />
          </main>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
