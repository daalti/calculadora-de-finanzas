import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./MarkDownTextBlog.css";

interface Props {
  title: string;
}

export const MarkDownTextBlog: React.FC<Props> = ({ title }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/assets/blogs/${title.toLowerCase()}.md`)
      .then((res) => res.text())
      .then((text) => {
        // Reemplaza la ruta de imágenes para que apunte a la carpeta public
        const updatedText = text.replace(
          /\/src\/assets\/blogs\/images/g,
          "/assets/blogs/images"
        );
        setContent(updatedText);
      });
  }, [title]);

  return (
    <div className="venture-capital-container">
      <div className="venture-capital-card">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]} // Nota: no es necesario repetir remarkGfm
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            p: ({ node, children }) => {
              const hasImage = node?.children?.some(
                (child: any) => child.tagName === "img"
              );
              if (hasImage) {
                return <>{children}</>;
              }
              return (
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    marginBottom: "1rem",
                    textAlign: "justify",
                  }}
                >
                  {children}
                </p>
              );
            },
            img: ({ src, alt }) => (
              <figure
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "2rem 0",
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    marginBottom: "1rem",
                  }}
                />
                <figcaption
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  {alt}
                </figcaption>
              </figure>
            ),
            // ... otros componentes personalizados
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
