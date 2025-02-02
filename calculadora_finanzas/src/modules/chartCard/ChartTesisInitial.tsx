import { Card } from "../../components/tremor/Card";
import TesisData from "../../assets/tesis/tesis.json";
import { useNavigate } from "react-router-dom";
import "./ChartTesisInitial.css";

interface Props {}

export const ChartTesisInitial: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="compound-interest-card-container">
      {Object.values(TesisData).map((data, index) => (
        <Card
          key={data.titulo}
          className="compound-interest-card"
          onClick={() => navigate(data.link)}
          style={{ cursor: "pointer" }}
        >
          <div className="calculator-card-content">
            <img
              src={`/src/assets/tesis/images/tesis-${index + 1}.png`}
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
