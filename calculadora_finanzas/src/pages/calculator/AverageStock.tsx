import { CalculatorPageTemplate } from "./CalculatorPageTemplate";

const RETURN_RATE_MESSAGE = (
  <>
    La calculadora de promedio de acciones te muestra el rendimiento potencial
    de tus inversiones, considerando compras realizadas en diferentes momentos a
    lo largo de los años, e incluso te ayuda a estimar los impuestos que deberás
    pagar.
  </>
);

interface Props {}

export const AverageStock: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Calculadora de Promedio de acciones"
      message={RETURN_RATE_MESSAGE}
      type="averageStock"
    />
  );
};
