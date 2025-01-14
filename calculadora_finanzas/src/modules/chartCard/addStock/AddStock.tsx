import { useState } from "react";
import { Input } from "../../../components/tremor/Input";
import { Label } from "../../../components/tremor/Label";
import { Button } from "../../../components/tremor/Button";
import "./AddStock.css";

interface StockData {
  value: number;
  number: number;
}

interface Props {
  stock: StockData;
  index: number;
  onStockChange: (index: number, newStock: StockData) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export const AddStock: React.FC<Props> = ({
  stock,
  index,
  onStockChange,
  onRemove,
  canRemove,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleInputChange =
    (field: keyof StockData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onStockChange(index, {
        ...stock,
        [field]: parseFloat(e.target.value) || 0,
      });
    };

  return (
    <div className="stock-entry">
      <Label className="average-stock-label-item">Compra {index + 1}</Label>
      <Input
        className="average-stock-input-item"
        placeholder="Introduce valor en €"
        value={isEditing ? stock.value : formatCurrency(stock.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onChange={handleInputChange("value")}
      />
      <Input
        className="average-stock-input-item"
        placeholder="Número de acciones"
        value={stock.number || ""}
        onChange={handleInputChange("number")}
        type="number"
      />
      {canRemove && (
        <Button
          variant="destructive"
          onClick={() => onRemove(index)}
          className="ml-2"
        >
          Delete
        </Button>
      )}
    </div>
  );
};
