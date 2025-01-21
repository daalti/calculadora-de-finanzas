import { useState, useEffect } from "react";
import { Card } from "../../components/tremor/Card";
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
    fetch(`/src/assets/blogs/${title.toLowerCase()}.md`)
      .then((res) => res.text())
      .then((text) => {
        // Replace image path in markdown
        const updatedText = text.replace(
          "../../assets/images",
          "/src/assets/images"
        );
        setContent(updatedText);
      });
  }, [title]);

  return (
    <div className="venture-capital-container">
      <Card className="venture-capital-card">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath, remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            p: ({ node, children }) => {
              // Check if the paragraph contains an image
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
              <div style={{ overflowX: "auto", margin: "2rem 0" }}>
                <table
                  style={{
                    width: "100%",
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
                  backgroundColor: "#f3f4f6",
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
      </Card>
    </div>
  );
};
