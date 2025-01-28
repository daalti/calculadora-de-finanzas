import { CalculatorPageTemplate } from "./CalculatorPageTemplate";

const LABOR_COST_MESSAGE = (
  <>
    El <strong>coste laboral</strong> es el gasto total que asume una empresa
    por cada trabajador. Este incluye no solo el <strong>salario bruto</strong>,
    sino también las <strong>cotizaciones a la Seguridad Social</strong>, como
    las destinadas a pensiones, desempleo y formación profesional. Además,
    abarca <strong>otros costes</strong>, como indemnizaciones, formación, o
    beneficios sociales. Entender el coste laboral es esencial para calcular la
    rentabilidad y los gastos operativos de una empresa.
  </>
);

interface Props {}

export const LaboralCost: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Coste Laboral"
      message={LABOR_COST_MESSAGE}
      type="laboralCost"
    />
  );
};
