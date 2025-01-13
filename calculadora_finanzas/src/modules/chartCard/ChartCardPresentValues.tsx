import { Card } from "../../components/tremor/Card";
import { Input } from "../../components/tremor/Input";
import { Label } from "../../components/tremor/Label";
import { Button } from "../../components/tremor/Button";
import { DonutChartTemplate } from "../../components/donutChartTemplate/DonutChartTemplate";
import { TableDonut } from "../tables/TableDonut";
import { TableArea } from "../tables/TableArea";
import { LineChartInterest } from "../lineChart/LineChartInterest";
import { useState, useEffect } from "react";
import { CalloutMessage } from "../callOut/CallOut";

interface Props {}

interface FormData {
  futureValue: number;
  years: number;
  discountRate: number;
}

interface ChartData {
  year: number;
  balance: number;
  interest: number;
  contributions: number;
}

interface TotalData {
  totalInterest: number;
  totalContributions: number;
  initialInvestment: number;
}

export const ChartCardPresentValue: React.FC<Props> = () => {
  const [formData, setFormData] = useState<FormData>({
    futureValue: 1000000,
    years: 10,
    discountRate: 10,
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [totalData, setTotalData] = useState<TotalData>({
    totalInterest: 0,
    totalContributions: 0,
    initialInvestment: 0,
  });

  const calculatePresentValue = () => {
    const { futureValue, years, discountRate } = formData;
    const data: ChartData[] = [];
    const rate = discountRate / 100;

    // Calculate initial present value
    const presentValue = futureValue / Math.pow(1 + rate, years);

    // Track year by year progress
    for (let year = 1; year <= years; year++) {
      const valueAtYear = presentValue * Math.pow(1 + rate, year);
      const yearlyInterest = valueAtYear - presentValue;

      data.push({
        year,
        balance: Math.round(valueAtYear),
        interest: Math.round(yearlyInterest),
        contributions: Math.round(presentValue),
      });
    }
    setResetData(false);
    setChartData(data);
    setTotalData({
      totalInterest: Math.round(futureValue - presentValue),
      totalContributions: 0,
      initialInvestment: Math.round(presentValue),
    });

    return data;
  };

  const [resetData, setResetData] = useState(true);
  const resetCompoundInterestValues = () => {
    setFormData({
      futureValue: 1000000,
      years: 10,
      discountRate: 10,
    });
    setResetData(true);
  };

  const handleInputChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({
        ...formData,
        [field]: parseFloat(e.target.value) || 0,
      });
    };

  useEffect(() => {
    if (resetData) {
      calculatePresentValue();
    }
  }, [resetData]);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingInterest, setIsEditingInterest] = useState(false);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const RESULT_MESSAGE = (
    <>
      Para ganar{" "}
      <strong>
        {(
          totalData.totalInterest +
          totalData.totalContributions +
          totalData.initialInvestment
        ).toLocaleString("es-ES", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </strong>{" "}
      necesitas una inversión inicial de{" "}
      <strong>
        {totalData.initialInvestment.toLocaleString("es-ES", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </strong>
    </>
  );

  return (
    <div className="compound-interest-card-container">
      <Card className="compound-interest-card">
        <div className="input-container">
          <Label className="label-item">Valor Futuro</Label>
          <Input
            className="input-item"
            placeholder="Introduce valor futuro deseado en €"
            value={
              isEditing
                ? formData.futureValue
                : formatCurrency(formData.futureValue)
            }
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
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
        <div className="input-container">
          <Label className="label-item">Tasa de Descuento (%)</Label>
          <Input
            className="input-item"
            placeholder="Introduce tasa de descuento"
            value={
              isEditingInterest
                ? formData.discountRate
                : (formData.discountRate / 100).toLocaleString("es-ES", {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
            }
            onFocus={() => setIsEditingInterest(true)}
            onBlur={() => setIsEditingInterest(false)}
            onChange={handleInputChange("discountRate")}
          />
        </div>
        <div className="flex justify-center gap-8">
          <Button onClick={calculatePresentValue}>Calcular</Button>
          <Button variant="secondary" onClick={resetCompoundInterestValues}>
            Reiniciar
          </Button>
        </div>
      </Card>
      <Card className="compound-interest-card compound-interest-card-chart">
        <div className="chart-container">
          <div>
            <CalloutMessage
              message={RESULT_MESSAGE}
              title=""
              variant="success"
            />
            <TableDonut data={totalData} />
          </div>
          <DonutChartTemplate data={totalData} />
        </div>
        <LineChartInterest chartData={chartData} />
        <TableArea chartData={chartData} />
      </Card>
    </div>
  );
};
