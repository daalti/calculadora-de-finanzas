import { CalculatorPageTemplate } from "./CalculatorPageTemplate";

const RETURN_RATE_MESSAGE = (
  <>
    La tasa de retorno (o CAGR, por sus siglas en inglés, Compound Annual Growth
    Rate) mide el crecimiento promedio anual de una inversión durante un periodo
    de tiempo, teniendo en cuenta el efecto del interés compuesto. En este caso,
    se utiliza como una herramienta clave para comparar las diferencias en la
    carga fiscal entre las comunidades autónomas y evaluar su impacto en la
    rentabilidad neta.
  </>
);

interface Props {}

export const IRPFComparison: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Calculadora IRPF Comparación Comunidades Autónomas"
      message={RETURN_RATE_MESSAGE}
      type="IRPFCA"
    />
  );
};
