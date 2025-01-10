import {
  Table,
  TableBody,
  TableCell,
  TableRoot,
  TableRow,
} from "../../components/tremor/Table";
import "./TableDonut.css";

interface data {
  totalInterest: number;
  totalContributions: number;
  initialInvestment: number;
}

interface Props {
  data: data;
}

export const TableDonut: React.FC<Props> = ({ data }) => {
  const total =
    data.totalInterest + data.totalContributions + data.initialInvestment;

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
        <TableBody>
          <TableRow>
            <TableCell className="table-row-name">
              <div style={{ backgroundColor: "#3b82f6", color: "#3b82f6" }}>
                ""
              </div>
              Inversión inicial
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(data.initialInvestment)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-row-name">
              <div style={{ backgroundColor: " #8b5cf6", color: " #8b5cf6" }}>
                ""
              </div>
              Contribuciones Totales
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(data.totalContributions)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-row-name">
              <div style={{ backgroundColor: "#10b981", color: "#10b981" }}>
                ""
              </div>
              Intereses Totales
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(data.totalInterest)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="table-row-name">Total</TableCell>
            <TableCell className="text-right" style={{ fontWeight: "700" }}>
              {formatCurrency(total)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableRoot>
  );
};
