import { useEffect, useState } from "react";
import { Card } from "../../components/tremor/Card";
import "./ChartGlosaryInitial.css";

interface GlosaryEntry {
  title: string;
  link: string;
}

interface Props {}

export const ChartGlosaryInitial: React.FC<Props> = () => {
  const [glosaryData, setGlosaryData] = useState<GlosaryEntry[]>([]);

  useEffect(() => {
    const fetchGlosaryData = async () => {
      try {
        const response = await fetch("/assets/glosary/glosary.json");
        const data = await response.json();
        const entries = Object.values(data.entries) as GlosaryEntry[];
        const sortedEntries = entries.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setGlosaryData(sortedEntries);
      } catch (error) {
        console.error("Error fetching glossary data:", error);
      }
    };

    fetchGlosaryData();
  }, []);

  return (
    <Card className="compound-interest-card-container-glosary">
      {glosaryData.map((entry) => (
        <a key={entry.title} href={entry.link} className="glosary-link">
          {entry.title}
        </a>
      ))}
    </Card>
  );
};
