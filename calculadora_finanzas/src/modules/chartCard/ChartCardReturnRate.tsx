import { useState } from "react";
import { Card } from "../../components/tremor/Card";
import { Input } from "../../components/tremor/Input";
import { Label } from "../../components/tremor/Label";
import { Button } from "../../components/tremor/Button";
import { CalloutMessage } from "../callOut/CallOut";
import "./ChartCard.css";

interface FormData {
  presentValue: number;
  futureValue: number;
  years: number;
}

export const ChartCardReturnRate: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    presentValue: 0,
    futureValue: 0,
    years: 0,
  });

  const [cagrResult, setCagrResult] = useState<number>(0);
  const [isEditingPresent, setIsEditingPresent] = useState(false);
  const [isEditingFuture, setIsEditingFuture] = useState(false);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateCAGR = () => {
    const { presentValue, futureValue, years } = formData;
    const cagr = (Math.pow(futureValue / presentValue, 1 / years) - 1) * 100;
    setCagrResult(cagr);
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: parseFloat(e.target.value) || 0,
      });
    };

  const resetValues = () => {
    setFormData({
      presentValue: 0,
      futureValue: 0,
      years: 0,
    });
    setCagrResult(0);
  };

  const CAGR_MESSAGE = (
    <>
      La tasa de retorno anual compuesta es del{" "}
      <strong style={{ fontSize: "2em" }}>{cagrResult.toFixed(2)}%</strong>
      <br />
      <br />
      Con un valor presente de{" "}
      <strong>{formatCurrency(formData.presentValue)}</strong> y un valor futuro
      de <strong>{formatCurrency(formData.futureValue)}</strong> en{" "}
      <strong>{formData.years}</strong> años.
    </>
  );

  return (
    <div className="compound-interest-card-container">
      <Card className="compound-interest-card">
        <div className="input-container">
          <Label className="label-item">Valor Presente</Label>
          <Input
            className="input-item"
            placeholder="Introduce valor presente en €"
            value={
              isEditingPresent
                ? formData.presentValue
                : formatCurrency(formData.presentValue)
            }
            onFocus={() => setIsEditingPresent(true)}
            onBlur={() => setIsEditingPresent(false)}
            onChange={handleInputChange("presentValue")}
          />
        </div>
        <div className="input-container">
          <Label className="label-item">Valor Futuro</Label>
          <Input
            className="input-item"
            placeholder="Introduce valor futuro en €"
            value={
              isEditingFuture
                ? formData.futureValue
                : formatCurrency(formData.futureValue)
            }
            onFocus={() => setIsEditingFuture(true)}
            onBlur={() => setIsEditingFuture(false)}
            onChange={handleInputChange("futureValue")}
          />
        </div>
        <div className="input-container">
          <Label className="label-item">Años</Label>
          <Input
            className="input-item"
            placeholder="Introduce cantidad de años"
            value={formData.years}
            onChange={handleInputChange("years")}
          />
        </div>
        <div className="flex justify-center gap-8">
          <Button onClick={calculateCAGR}>Calcular</Button>
          <Button variant="secondary" onClick={resetValues}>
            Reiniciar
          </Button>
        </div>
      </Card>
      <Card>
        <CalloutMessage
          message={CAGR_MESSAGE}
          title="Tasa de Retorno"
          variant="success"
        />
      </Card>
    </div>
  );
};
