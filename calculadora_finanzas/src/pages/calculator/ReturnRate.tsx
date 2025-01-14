import { CalculatorPageTemplate } from "./CalculatorPageTemplate";

const RETURN_RATE_MESSAGE = (
  <>
    La tasa de retorno (o CAGR, por sus siglas en inglés, Compound Annual Growth
    Rate) mide el crecimiento promedio anual de una inversión durante un periodo
    de tiempo, teniendo en cuenta el efecto del interés compuesto. Es clave para
    comparar el rendimiento de diferentes inversiones y evaluar su rentabilidad.
  </>
);

interface Props {}

export const ReturnRate: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Calculadora Tasa de Retorno (CAGR)"
      message={RETURN_RATE_MESSAGE}
      type="returnRate"
    />
  );
};
