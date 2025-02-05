"use client";

import { LineChart } from "../../components/tremor/LineChart";
import { useEffect, useState } from "react";
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

export const LineChartInterest: React.FC<Props> = ({ chartData }) => {
  const data = chartData.map((item) => ({
    date: `Año ${item.year}`,
    "Retorno Total": item.balance,
    "Contribuciones Totales":
      item.contributions * item.year + item.initialInvestment,
  }));

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <LineChart
      data={data}
      index="date"
      categories={["Retorno Total", "Contribuciones Totales"]}
      valueFormatter={(number: number) =>
        number.toLocaleString("es-ES", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      }
      onValueChange={(v) => console.log(v)}
      xAxisLabel="Años"
      yAxisWidth={0}
      {...(!isMobile && { yAxisWidth: 120 })}
    />
  );
};
