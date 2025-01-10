import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
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
}

interface Props {
  chartData: ChartData[];
}

export const TableArea: React.FC<Props> = ({ chartData }) => {
  const totalBalance = chartData.reduce((acc, item) => acc + item.balance, 0);
  const totalInterest = chartData.reduce((acc, item) => acc + item.interest, 0);
  const totalContributions = chartData.reduce(
    (acc, item) => acc + item.contributions,
    0
  );

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
            <TableRow key={index}>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                {item.year}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.balance)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.interest)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.contributions)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableHeaderCell colSpan={2} scope="row" className="text-right">
              {formatCurrency(totalBalance)}
            </TableHeaderCell>
            <TableHeaderCell scope="row" className="text-right">
              {formatCurrency(totalInterest)}
            </TableHeaderCell>
            <TableHeaderCell scope="row" className="text-right">
              {formatCurrency(totalContributions)}
            </TableHeaderCell>
          </TableRow>
        </TableFoot>
      </Table>
    </TableRoot>
  );
};
