import { Card } from "../../components/tremor/Card";
import calculatorData from "../../assets/calculator/calculator.json";
import { useNavigate } from "react-router-dom";
import "./ChartCardInitial.css";

interface Props {}

export const ChartCardInitial: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="compound-interest-card-container">
      {Object.values(calculatorData).map((calculator) => (
        <Card
          key={calculator.titulo}
          className="compound-interest-card"
          onClick={() => navigate(calculator.link)}
          style={{ cursor: "pointer" }}
        >
          <div className="calculator-card-content">
            <img
              src={`/src/assets/images/calculators/${calculator.titulo
                .toLowerCase()
                .replace(/ /g, "-")}.webp`}
              alt={calculator.titulo}
              className="calculator-card-image"
            />
            <div className="calculator-card-text">
              <h2>{calculator.titulo}</h2>
              <p>{calculator.descripcion}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
