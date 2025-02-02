import { CalculatorPageTemplate } from "./CalculatorPageTemplate";

const RETURN_RATE_MESSAGE = (
  <>
    El IRPF (Impuesto sobre la Renta de las Personas Físicas) es un tributo que
    grava la renta obtenida por los ciudadanos, incluyendo ingresos del trabajo,
    ganancias patrimoniales y otros rendimientos. Es uno de los principales
    impuestos que se aplican a nivel personal en muchos países de habla hispana.
  </>
);

interface Props {}

export const IRPF: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Calculadora IRPF 2025"
      message={RETURN_RATE_MESSAGE}
      type="IRPF"
    />
  );
};
