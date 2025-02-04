import { useEffect, useState } from "react";
import { Card } from "../../components/tremor/Card";
import { useNavigate } from "react-router-dom";
import "./ChartCardInitial.css";

// Función para obtener los datos de las calculadoras desde public
const getCalculatorData = async () => {
  const response = await fetch("/assets/calculator/calculator.json");
  const data = await response.json();
  return data;
};

interface Props {}

export const ChartCardInitial: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [calculatorData, setCalculatorData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const calculators = await getCalculatorData();
      // Asegurarse de que los datos sean un array
      setCalculatorData(
        Array.isArray(calculators) ? calculators : Object.values(calculators)
      );
    };

    fetchData();
  }, []);

  return (
    <div className="compound-interest-card-container">
      {calculatorData.map((calculator, index) => (
        <Card
          key={calculator.titulo}
          className="compound-interest-card"
          onClick={() => navigate(calculator.link)}
          style={{ cursor: "pointer" }}
        >
          <div className="calculator-card-content">
            <img
              src={`/assets/calculator/images/calculator-${index + 1}.webp`}
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
