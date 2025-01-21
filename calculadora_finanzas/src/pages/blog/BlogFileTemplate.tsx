import { MenuNav } from "../../modules/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { FooterPage } from "../../modules/footer/Footer";
import { MarkDownTextBlog } from "./MarkDownTextBlog";
import { GridList } from "../../components/gridList/GridList";
import "./BlogFileTemplate.css";

interface Props {
  title: string;
}

export const BlogFileTemplate: React.FC<Props> = ({ title }) => {
  return (
    <div className="glosario-file-template">
      <MenuNav />
      <div className="glosario-file-template-main">
        <div className="glosario-file-template-content">
          <main>
            <MarkDownTextBlog title={title} />
            <GridList />
          </main>
          <AsideMenu />
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
