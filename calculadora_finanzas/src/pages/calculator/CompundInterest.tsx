import { CalculatorPageTemplate } from "./CalculatorPageTemplate";

const COMPOUND_INTEREST_MESSAGE = (
  <>
    Con una inversión mensual de <strong>300€</strong> durante{" "}
    <strong>35</strong> años y una revalorización del
    <strong> 10%</strong> anual conseguirás acumular más de
    <strong> 1.000.000€</strong> Selecciona en la calculadora de interés
    compuesto tus posibilidades de ahorro e inversión y descubre cuánto podrás
    acumular. Puede usarse para cualquier tipo de activo:{" "}
    <strong>fondos indexados, ETFs, acciones, cryptos, etc.</strong>
  </>
);

interface Props {}

export const CompoundInterest: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Calculadora Interés Compuesto"
      message={COMPOUND_INTEREST_MESSAGE}
      type="compoundInterest"
    />
  );
};
