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

export const TableCompoundInterest: React.FC<Props> = ({ chartData }) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getCumulativeContributions = (index: number): number => {
    return chartData
      .slice(0, index + 1)
      .reduce((sum, item) => sum + item.contributions, 0);
  };

  return (
    <TableRoot>
      <Table>
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
            <TableRow key={item.year}>
              <TableCell>{item.year}</TableCell>
              <TableCell>{formatCurrency(item.balance)}</TableCell>
              <TableCell>{formatCurrency(item.interest)}</TableCell>
              <TableCell>
                {formatCurrency(
                  getCumulativeContributions(index) + item.initialInvestment
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
};
