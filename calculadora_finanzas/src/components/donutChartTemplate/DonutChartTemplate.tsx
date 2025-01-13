"use client";

import { DonutChart } from "../tremor/DonutChart";

interface data {
  totalInterest: number;
  totalContributions: number;
  initialInvestment: number;
}

interface Props {
  data: data;
}

export const DonutChartTemplate: React.FC<Props> = ({
  data = {
    totalInterest: 10,
    totalContributions: 10,
    initialInvestment: 10,
  },
}) => {
  if (!data) return null;
  const chartData = [
    {
      name: "Inversión Inicial",
      amount: data.initialInvestment,
    },
    {
      name: "Total Interés",
      amount: data.totalInterest,
    },
    {
      name: "Total Contribuciones",
      amount: data.totalContributions,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <DonutChart
        data={chartData}
        variant="pie"
        category="name"
        value="amount"
        valueFormatter={(number: number) =>
          number.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
};
