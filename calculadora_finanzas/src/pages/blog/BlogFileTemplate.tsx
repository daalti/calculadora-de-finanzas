import { MenuNav } from "../../modules/MenuNav/MenuNav";
import { AsideMenu } from "../../modules/asideMenu/AsideMenu";
import { FooterPage } from "../../modules/footer/Footer";
import { MarkDownTextBlog } from "./MarkDownTextBlog";
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
          <AsideMenu />
          <main
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "0 20px",
            }}
          >
            <MarkDownTextBlog title={title} />
          </main>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
