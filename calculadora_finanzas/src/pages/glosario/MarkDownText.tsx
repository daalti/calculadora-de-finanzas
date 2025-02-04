import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import "katex/dist/katex.min.css";
import "./MarkDownText.css";

interface Props {
  title: string;
}

export const MarkDownText: React.FC<Props> = ({ title }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/assets/glosary/${title.toLowerCase()}.md`)
      .then((res) => res.text())
      .then((text) => {
        // Reemplaza la ruta de imágenes para que apunte a la carpeta public
        const updatedText = text.replace(
          /\/src\/assets\/glosary\/images/g,
          "/assets/glosary/images"
        );
        setContent(updatedText);
      });
  }, [title]);

  return (
    <div className="venture-capital-container">
      <div className="venture-capital-card">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug]}
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
            a: ({ children, href }) => (
              <a
                href={href}
                style={{
                  color: "#3B82F6",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {children}
              </a>
            ),
            ol: ({ children }) => (
              <ol
                style={{
                  listStyleType: "decimal",
                  paddingLeft: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {children}
              </ol>
            ),
            ul: ({ children }) => (
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li
                style={{
                  marginBottom: "0.5rem",
                }}
              >
                {children}
              </li>
            ),
            table: ({ children }) => (
              <div
                style={{
                  overflowX: "auto",
                  margin: "2rem 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <table
                  style={{
                    width: "70%",
                    borderCollapse: "collapse",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead
                style={{
                  backgroundColor: "#3B82F6",
                  color: "#fff",
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                {children}
              </thead>
            ),
            tr: ({ children }) => (
              <tr
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {children}
              </tr>
            ),
            td: ({ children }) => {
              return (
                <td
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #e5e7eb",
                    textAlign: "right",
                  }}
                >
                  {children}
                </td>
              );
            },
            th: ({ children }) => (
              <th
                style={{
                  padding: "12px 16px",
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                {children}
              </th>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
