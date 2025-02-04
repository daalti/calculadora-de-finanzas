import { useEffect, useState } from "react";
import { Card } from "../../components/tremor/Card";
import { useNavigate } from "react-router-dom";
import "./ChartTesisInitial.css";

interface TesisEntry {
  titulo: string;
  descripcion: string;
  link: string;
}

interface Props {}

export const ChartTesisInitial: React.FC<Props> = () => {
  const [tesisData, setTesisData] = useState<TesisEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTesisData = async () => {
      try {
        const response = await fetch("/assets/tesis/tesis.json");
        const data = await response.json();
        const entries = Array.isArray(data) ? data : Object.values(data);
        setTesisData(entries);
      } catch (error) {
        console.error("Error fetching tesis data:", error);
      }
    };

    fetchTesisData();
  }, []);

  return (
    <div className="compound-interest-card-container">
      {tesisData.map((data, index) => (
        <Card
          key={data.titulo}
          className="compound-interest-card"
          onClick={() => navigate(data.link)}
          style={{ cursor: "pointer" }}
        >
          <div className="calculator-card-content">
            <img
              src={`/assets/tesis/images/tesis-${index + 1}.png`}
              alt={data.titulo}
              className="calculator-card-image"
              style={{ width: "200px" }}
            />
            <div className="calculator-card-text">
              <h2>{data.titulo}</h2>
              <p>{data.descripcion}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
