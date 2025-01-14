import { useState, useEffect } from "react";
import { Card } from "../../components/tremor/Card";
import ReactMarkdown from "react-markdown";
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
  }, []);

  return (
    <div className="venture-capital-container">
      <Card className="venture-capital-card">
        <ReactMarkdown
          children={content as any} // Cambia el contenido usando `children`
        />
      </Card>
    </div>
  );
};
