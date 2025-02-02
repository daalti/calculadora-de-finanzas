import { CalculatorPageTemplate } from "./../calculator/CalculatorPageTemplate";

const TESIS_INITIAL_MESSAGE = (
  <>
    Aquí podrás encontrar una amplia variedad de{" "}
    <strong>tesis de inversión</strong> diseñadas para ofrecerte un análisis
    detallado de las oportunidades y estrategias en los mercados financieros.
    Estas tesis te permitirán comprender los fundamentos económicos, evaluar
    riesgos y proyectar escenarios de crecimiento, ayudándote a tomar decisiones
    de inversión informadas. Explora las diferentes propuestas y descubre cómo
    cada enfoque puede guiarte para optimizar tu portafolio y alcanzar tus
    objetivos financieros.
  </>
);

interface Props {}

export const TesisInitial: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Tesis de Inversión"
      message={TESIS_INITIAL_MESSAGE}
      type="TesisInitial"
    />
  );
};
