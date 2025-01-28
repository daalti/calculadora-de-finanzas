"use client";

import { BarChart } from "../../components/tremor/BarChart";

interface BarChartIRPFComparisonProps {
  data: { comunidad: string; diferencia: number }[];
}

export const BarChartIRPFComparison: React.FC<BarChartIRPFComparisonProps> = ({
  data,
}) => {
  return (
    <>
      <BarChart
        style={{ height: "800px" }}
        className="h-72"
        data={data}
        index={"comunidad"}
        categories={["diferencia"]}
        yAxisWidth={200}
        layout={"vertical"}
        valueFormatter={(number) =>
          number.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }
      />
    </>
  );
};
