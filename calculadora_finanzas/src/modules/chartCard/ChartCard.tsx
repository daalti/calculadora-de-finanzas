import { Card } from "../../components/tremor/Card";
import { Input } from "../../components/tremor/Input";
import { Label } from "../../components/tremor/Label";
import { Button } from "../../components/tremor/Button";
import { DonutChartTemplate } from "../../components/donutChartTemplate/DonutChartTemplate";
import { AccordionComnpountInterest } from "../../components/accordion/AccodionCompoundInterest";
import { TableDonut } from "../tables/TableDonut";
import { TableCompoundInterest } from "../tables/TableCompoundInterest";
import { LineChartInterest } from "../lineChart/LineChartInterest";
import { CalloutMessage } from "../callOut/CallOut";
import { useState, useEffect } from "react";
import "./ChartCard.css";

interface Props {}

interface FormData {
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
  interestRate: number;
  compoundingFrequency: number;
}

interface ChartData {
  initialInvestment: number;
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

export const ChartCard: React.FC<Props> = () => {
  const [formData, setFormData] = useState<FormData>({
    initialInvestment: 1000,
    monthlyContribution: 100,
    years: 10,
    interestRate: 10,
    compoundingFrequency: 12,
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [totalData, setTotalData] = useState<TotalData>({
    totalInterest: 0,
    totalContributions: 0,
    initialInvestment: 0,
  });

  const calculateCompoundInterest = () => {
    const {
      initialInvestment,
      monthlyContribution,
      years,
      interestRate,
      compoundingFrequency,
    } = formData;

    const data: ChartData[] = [];
    let balance = initialInvestment;
    const periodsPerYear = compoundingFrequency;
    const periodicRate = interestRate / 100 / periodsPerYear;
    const monthsPerPeriod = 12 / periodsPerYear;
    console.log("initialInvestment", initialInvestment);
    console.log("monthlyContribution", monthlyContribution);
    console.log("years", years);
    console.log("interestRate", interestRate);
    console.log("compoundingFrequency", compoundingFrequency);

    for (let year = 1; year <= years; year++) {
      let yearlyInterest = 0;
      let yearlyContributions = 0;

      // Calculate for each compounding period in the year
      for (let period = 1; period <= periodsPerYear; period++) {
        // Add contributions for this period
        const contributionsThisPeriod = monthlyContribution * monthsPerPeriod;
        balance += contributionsThisPeriod;
        yearlyContributions += contributionsThisPeriod;

        // Calculate and add periodic interest
        const periodInterest = balance * periodicRate;
        balance += periodInterest;
        yearlyInterest += periodInterest;
      }

      data.push({
        year,
        balance: Math.round(balance),
        interest: Math.round(yearlyInterest),
        contributions: Math.round(yearlyContributions),
        initialInvestment,
      });
      setResetData(false);
    }

    setTotalData({
      totalInterest: data.reduce((acc, item) => acc + item.interest, 0),
      totalContributions: data.reduce(
        (acc, item) => acc + item.contributions,
        0
      ),
      initialInvestment,
    });

    setChartData(data);
    console.log(data);
    return data;
  };

  const [resetData, setResetData] = useState(true);
  const resetCompoundInterestValues = () => {
    setFormData({
      initialInvestment: 1000,
      monthlyContribution: 100,
      years: 10,
      interestRate: 10,
      compoundingFrequency: 12,
    });
    setResetData(true);
  };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prevData) => ({
        ...prevData,
        [field]: value === "" ? "" : parseFloat(value),
      }));
    };

  useEffect(() => {
    if (resetData) {
      calculateCompoundInterest();
    }
  }, [resetData]);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMonthly, setIsEditingMonthly] = useState(false);
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
      Puedes ganar{" "}
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
      con una inversión inicial de{" "}
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
          <Label className="label-item">Inversión inicial</Label>
          <Input
            className="input-item"
            placeholder="Introduce cantidad en €"
            value={
              isEditing
                ? formData.initialInvestment === 0
                  ? ""
                  : formData.initialInvestment
                : formatCurrency(formData.initialInvestment)
            }
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            onChange={handleInputChange("initialInvestment")}
          />
        </div>
        <div className="input-container">
          <Label className="label-item">Contribución Mensual</Label>
          <Input
            className="input-item"
            placeholder="Introduce cantidad en €"
            value={
              isEditingMonthly
                ? formData.monthlyContribution
                : formData.monthlyContribution.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
            }
            onFocus={() => setIsEditingMonthly(true)}
            onBlur={() => setIsEditingMonthly(false)}
            onChange={handleInputChange("monthlyContribution")}
          />
        </div>
        <div className="input-container">
          <Label className="label-item">Cantidad de tiempo en años</Label>
          <Input
            className="input-item"
            onChange={handleInputChange("years")}
            value={formData.years}
            placeholder="Ingrese los años"
          />
        </div>
        <div className="input-container">
          <Label className="label-item">Tasa de interes estimada</Label>
          <Input
            className="input-item"
            placeholder="Introduce porcentaje %"
            value={
              isEditingInterest
                ? formData.interestRate
                : (formData.interestRate / 100).toLocaleString("es-ES", {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
            }
            onFocus={() => setIsEditingInterest(true)}
            onBlur={() => setIsEditingInterest(false)}
            onChange={handleInputChange("interestRate")}
          />
        </div>
        <div className="flex justify-center gap-8">
          <Button onClick={calculateCompoundInterest}>Calcular</Button>
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
        <TableCompoundInterest chartData={chartData} />
      </Card>
      <AccordionComnpountInterest />
    </div>
  );
};
