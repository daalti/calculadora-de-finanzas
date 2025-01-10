import {
  Table,
  TableBody,
  TableCell,
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

export const TableHero: React.FC<Props> = ({ chartData }) => {
  return (
    <TableRoot>
      <Table>
        <TableBody>
          {chartData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.year}</TableCell>
              <TableCell className="text-right">{item.balance}</TableCell>
              <TableCell>{item.interest}</TableCell>
              <TableCell>{item.contributions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
};
