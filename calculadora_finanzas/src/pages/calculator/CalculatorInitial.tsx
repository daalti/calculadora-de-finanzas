import { CalculatorPageTemplate } from "./CalculatorPageTemplate";

const CALCULATOR_INITIAL_MESSAGE = (
  <>
    Aquí podrás encontrar una amplia variedad de{" "}
    <strong>calculadoras financieras</strong> diseñadas para ayudarte a
    gestionar tus <strong>ahorros</strong> e <strong>inversiones</strong> de
    manera eficiente. Estas herramientas te permitirán analizar diferentes
    escenarios, calcular el <strong>crecimiento</strong> de tus inversiones a lo
    largo del tiempo y establecer objetivos <strong>financieros claros</strong>.
    Desde calcular el <strong>interés compuesto</strong> hasta evaluar
    rendimientos de activos como <strong>fondos indexados</strong>,{" "}
    <strong>ETFs</strong>, <strong>acciones</strong>,{" "}
    <strong>criptomonedas</strong> y más, podrás tomar decisiones informadas
    para optimizar tus <strong>finanzas personales</strong>. Explora las
    opciones disponibles y descubre cómo <strong>maximizar tus ahorros</strong>{" "}
    y alcanzar tus <strong>metas económicas</strong>.
  </>
);

interface Props {}

export const CalculatorInitial: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Calculadoras Financieras"
      message={CALCULATOR_INITIAL_MESSAGE}
      type="initial"
    />
  );
};
