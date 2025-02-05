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
          <main
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              padding: "0 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <a
              href={`/assets/tesis/pdfs/${title.toLowerCase()}.pdf`}
              download
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#3B82F6",
                color: "white",
                borderRadius: "0.375rem",
                textDecoration: "none",
                margin: "2rem 0",
                cursor: "pointer",
              }}
            >
              Descargar Tesis en PDF
            </a>
            <MarkDownTextTesis title={title} />
          </main>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
