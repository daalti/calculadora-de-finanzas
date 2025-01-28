import { Card } from "../../components/tremor/Card";
import glosaryData from "../../assets/glosary/glosary.json";
import "./ChartGlosaryInitial.css";

interface Props {}

export const ChartGlosaryInitial: React.FC<Props> = () => {
  const sortedEntries = [...glosaryData.entries].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <Card className="compound-interest-card-container-glosary">
      {sortedEntries.map((entry) => (
        <a key={entry.title} href={entry.link} className="glosary-link">
          {entry.title}
        </a>
      ))}
    </Card>
  );
};
