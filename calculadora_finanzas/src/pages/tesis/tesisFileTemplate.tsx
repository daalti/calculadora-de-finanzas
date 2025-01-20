import { MenuNav } from "../../modules/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { FooterPage } from "../../modules/footer/Footer";
import { MarkDownTextTesis } from "./MarkDownTextTesis";
import { GridList } from "../../components/gridList/GridList";
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
          <main>
            <MarkDownTextTesis title={title} />
            <GridList />
          </main>
          <AsideMenu />
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
