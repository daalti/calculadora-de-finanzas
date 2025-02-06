import React, { useState, useEffect } from "react";
import { LineChart } from "../../components/tremor/LineChart";

interface Props {
  chartData: { year: number; balance: number }[];
}

export const LineChartPresentValue: React.FC<Props> = ({ chartData }) => {
  const data = chartData.map((item) => ({
    date: `Año ${item.year}`,
    "Retorno Total": item.balance,
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

  const valueFormatter = (number: number) => {
    if (isMobile) {
      if (number >= 1000) {
        return `${(number / 1000).toFixed(1)}K`;
      }
      return number.toString();
    } else {
      return number.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
  };

  return (
    <LineChart
      data={data}
      index="date"
      categories={["Retorno Total"]}
      valueFormatter={valueFormatter}
      onValueChange={(v) => console.log(v)}
      xAxisLabel="Años"
      yAxisWidth={70}
      allowDecimals={false}
      {...(!isMobile && { yAxisWidth: 120 })}
    />
  );
};

export default LineChartPresentValue;
