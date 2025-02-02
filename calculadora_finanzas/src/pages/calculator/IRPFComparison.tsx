import { CalculatorPageTemplate } from "./CalculatorPageTemplate";

const RETURN_RATE_MESSAGE = (
  <>
    La comparación del IRPF entre Comunidades Autónomas se refiere al análisis
    de las diferencias en la tributación del Impuesto sobre la Renta de las
    Personas Físicas que aplican las distintas regiones de España. Estas
    variaciones pueden afectar tanto las escalas impositivas como las
    deducciones y bonificaciones, modificando la carga fiscal para los
    contribuyentes en cada comunidad.
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
