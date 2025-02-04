import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "../../components/tremor/Table";

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

export const TableArea: React.FC<Props> = ({ chartData }) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <TableRoot style={{ display: "block" }}>
      <style>
        {`
        @media (max-width: 850px) {
        .responsive-table {
          display: none;
        }
        }
      `}
      </style>
      <Table className="responsive-table">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Año</TableHeaderCell>
            <TableHeaderCell>Balance</TableHeaderCell>
            <TableHeaderCell>Interes</TableHeaderCell>
            <TableHeaderCell>Contribución</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chartData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                {item.year}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.balance)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.balance - item.contributions)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.contributions)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
};
