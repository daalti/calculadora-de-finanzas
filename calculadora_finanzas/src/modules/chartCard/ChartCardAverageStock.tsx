import { useState } from "react";
import { Card } from "../../components/tremor/Card";
import { Button } from "../../components/tremor/Button";
import { AddStock } from "./addStock/AddStock";
import { CalloutMessage } from "../callOut/CallOut";
import { Input } from "../../components/tremor/Input";
import { Label } from "../../components/tremor/Label";
import { AccordionAverageStock } from "../../components/accordion/AccordionAverageStock";
import "./ChartCardAverageStock.css";

interface StockData {
  value: number;
  number: number;
}

interface FormData {
  currentValue: number;
  stockData: StockData[];
}

export const ChartCardAverageStock: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    currentValue: 0,
    stockData: [{ value: 0, number: 0 }],
  });

  const [averageResult, setAverageResult] = useState<number>(0);
  const [profitResult, setProfitResult] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleStockChange = (index: number, newStock: StockData) => {
    const newStockData = [...formData.stockData];
    newStockData[index] = newStock;
    setFormData({ ...formData, stockData: newStockData });
  };

  const addNewStock = () => {
    setFormData({
      ...formData,
      stockData: [...formData.stockData, { value: 0, number: 0 }],
    });
  };

  const removeStock = (index: number) => {
    if (formData.stockData.length > 1) {
      setFormData({
        ...formData,
        stockData: formData.stockData.filter((_, i) => i !== index),
      });
    }
  };

  const calculateAverageStock = () => {
    const totalShares = formData.stockData.reduce(
      (sum, stock) => sum + stock.number,
      0
    );
    const totalInvested = formData.stockData.reduce(
      (sum, stock) => sum + stock.value * stock.number,
      0
    );

    const average = totalInvested / totalShares;
    const currentTotalValue = formData.currentValue * totalShares;
    const profit = currentTotalValue - totalInvested;

    setAverageResult(average);
    setProfitResult(profit);
  };

  const resetValues = () => {
    setFormData({
      currentValue: 0,
      stockData: [{ value: 0, number: 0 }],
    });
    setAverageResult(0);

    setProfitResult(0);
  };

  const AVERAGE_MESSAGE = (
    <>
      El precio promedio de tus acciones es de{" "}
      <strong style={{ fontSize: "1.5em" }}>
        {formatCurrency(averageResult)}
      </strong>
      <br />
      <br />
      {profitResult !== 0 && (
        <>
          Tu beneficio actual es de{" "}
          <strong
            style={{
              fontSize: "1.5em",
              color: profitResult >= 0 ? "#10b981" : "#ef4444",
            }}
          >
            {formatCurrency(profitResult)}
          </strong>
        </>
      )}
    </>
  );

  const handleInputChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({
        ...formData,
        [field]: parseFloat(e.target.value) || 0,
      });
    };

  return (
    <div className="average-stock-card-container">
      <Card className="average-stock-card">
        <div className="input-container" style={{ marginBottom: "2rem" }}>
          <Label className="label-item">
            Valor actual de todas tus acciones
          </Label>
          <Input
            className="input-item"
            placeholder="Introduce cantidad en €"
            value={
              isEditing
                ? formData.currentValue
                : formatCurrency(formData.currentValue)
            }
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            onChange={handleInputChange("currentValue")}
          />
        </div>
        {formData.stockData.map((stock, index) => (
          <AddStock
            key={index}
            stock={stock}
            index={index}
            onStockChange={handleStockChange}
            onRemove={removeStock}
            canRemove={formData.stockData.length > 0}
          />
        ))}
        <div className="flex justify-center gap-8 mt-4 media-column-button">
          <Button variant="light" onClick={addNewStock}>
            Añadir Compra
          </Button>
          <Button onClick={calculateAverageStock}>Calcular</Button>
          <Button variant="secondary" onClick={resetValues}>
            Reiniciar
          </Button>
        </div>
      </Card>
      <Card>
        <CalloutMessage
          message={AVERAGE_MESSAGE}
          title="Precio Promedio"
          variant="success"
        />
      </Card>
      <AccordionAverageStock />
    </div>
  );
};
