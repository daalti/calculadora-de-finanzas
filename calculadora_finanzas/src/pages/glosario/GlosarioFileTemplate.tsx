import { MenuNav } from "../../modules/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { FooterPage } from "../../modules/footer/Footer";
import { MarkDownText } from "./MarkDownText";
import { GridList } from "../../components/gridList/GridList";
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
          <main>
            <MarkDownText title={title} />
            <GridList />
          </main>
          <AsideMenu />
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
