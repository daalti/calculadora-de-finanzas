import { CalculatorPageTemplate } from "../calculator/CalculatorPageTemplate";

const BLOG_WELCOME_MESSAGE = (
  <>
    ¡Bienvenidos al <strong>Glosario</strong>! En esta sección encontrarás
    definiciones claras y concisas de diversos conceptos, desde términos de{" "}
    <strong>economía</strong> y <strong>finanzas</strong>. Explora cada entrada
    para ampliar tus conocimientos y comprender mejor los temas que te
    interesan.
  </>
);

interface Props {}

export const GlosarioInitial: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Glosario"
      message={BLOG_WELCOME_MESSAGE}
      type="GlosarioInitial"
    />
  );
};
