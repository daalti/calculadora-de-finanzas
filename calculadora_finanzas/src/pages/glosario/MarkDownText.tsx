import { useState, useEffect } from "react";
import { Card } from "../../components/tremor/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./MarkDownText.css";

interface Props {
  title: string;
}

export const MarkDownText: React.FC<Props> = ({ title }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/src/assets/glosary/" + title + ".md")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, [title]);

  return (
    <div className="venture-capital-container">
      <Card className="venture-capital-card">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      </Card>
    </div>
  );
};
