"use client";

import { LineChart } from "../../components/tremor/LineChart";

interface ChartData {
  year: number;
  balance: number;
  interest: number;
  contributions: number;
  initialInvestment: number;
}

interface Props {
  chartData: ChartData[];
}

export const LineChartPresentValue: React.FC<Props> = ({ chartData }) => {
  const data = chartData.map((item) => ({
    date: `Año ${item.year}`,
    "Retorno Total": item.balance,
  }));

  return (
    <LineChart
      data={data}
      index="date"
      categories={["Retorno Total", "Contribuciones Totales"]}
      valueFormatter={(number: number) =>
        number.toLocaleString("es-ES", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      }
      onValueChange={(v) => console.log(v)}
      xAxisLabel="Años"
      yAxisLabel="Euros"
      yAxisWidth={120}
    />
  );
};
