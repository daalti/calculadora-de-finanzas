import { MenuNav } from "../../modules/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { FooterPage } from "../../modules/footer/Footer";
import { MarkDownText } from "./MarkDownText";

import "./GlosarioFileTemplate.css";

interface Props {
  title: string;
}

export const GlosarioFileTemplate: React.FC<Props> = ({ title }) => {
  return (
    <div className="glosario-file-template">
      <MenuNav />
      <div className="glosario-file-template-main">
        <div className="glosario-file-template-content">
          <AsideMenu />
          <main className="glosario-file-template-main">
            <MarkDownText title={title} />
          </main>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
