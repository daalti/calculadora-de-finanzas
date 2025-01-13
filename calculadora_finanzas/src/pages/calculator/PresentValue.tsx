import { CalculatorPageTemplate } from "./CalculatorPageTemplate";

interface Props {}

const COMPOUND_INTEREST_MESSAGE = (
  <>
    <p>
      El valor presente (PV) es un concepto financiero clave que permite
      calcular cuánto deberíamos invertir hoy para alcanzar una cantidad
      específica en el futuro, considerando una tasa de interés determinada.
      Este principio es fundamental en áreas como la valoración de inversiones,
      proyectos y acciones.
    </p>
    <br />
    <p>
      Supongamos que quieres tener <strong>10,000€</strong> dentro de 5 años y
      la tasa de interés anual es del 5%. Usando la fórmula del valor presente:
    </p>
    <br />
    <p>
      Esto significa que, si inviertes aproximadamente{" "}
      <strong>7,835.26€ </strong> hoy al <strong>5% anual</strong>, tendrás{" "}
      <strong>10,000€</strong> en 5 años.
    </p>
  </>
);

export const PresentValue: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Calculadora Valor Presente"
      message={COMPOUND_INTEREST_MESSAGE}
      type="presentValue"
    />
  );
};
