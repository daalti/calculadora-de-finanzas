import { AccordionTemplate } from "./AccordionTemplate";
const accordionData = [
  {
    question: "¿Qué es el Valor Presente (PV)?",
    answer:
      "El valor presente (PV) es un concepto financiero clave que permite calcular cuánto deberíamos invertir hoy para alcanzar una cantidad específica en el futuro, considerando una tasa de interés determinada. Este principio es fundamental en áreas como la valoración de inversiones, proyectos y acciones.",
  },
  {
    question: "¿Cuál es la fórmula del Valor Presente?",
    answer: (
      <>
        <p>La fórmula para calcular el Valor Presente es:</p>
        <code>PV = FV / (1 + r)^t</code>
        <ul>
          <li>
            <strong>PV:</strong> Valor Presente
          </li>
          <li>
            <strong>FV:</strong> Valor Futuro
          </li>
          <li>
            <strong>r:</strong> Tasa de interés o tasa de descuento
          </li>
          <li>
            <strong>t:</strong> Número de periodos
          </li>
        </ul>
      </>
    ),
  },
  {
    question:
      "¿Por qué es importante el Valor Presente en la valoración de inversiones?",
    answer:
      "El Valor Presente permite determinar el valor actual de flujos de efectivo futuros, facilitando la comparación de inversiones o proyectos y ayudando a tomar decisiones informadas sobre la asignación de recursos.",
  },
  {
    question:
      "¿Cómo se utiliza el Valor Presente en la evaluación de proyectos?",
    answer:
      "Se utiliza para calcular el Valor Presente Neto (VPN), que es la suma de los valores presentes de todos los flujos de efectivo futuros esperados de un proyecto, descontados a una tasa que refleja el riesgo y el costo de oportunidad.",
  },
  {
    question:
      "¿Qué papel juega la tasa de interés en el cálculo del Valor Presente?",
    answer:
      "La tasa de interés o tasa de descuento es fundamental en el cálculo del Valor Presente, ya que determina el factor de descuento. Una tasa más alta reduce el valor presente de los flujos futuros, reflejando un mayor riesgo o costo de oportunidad.",
  },
  {
    question: "¿Cuál es la diferencia entre Valor Presente y Valor Futuro?",
    answer:
      "El Valor Futuro (FV) representa la cantidad de dinero que se espera tener en el futuro, mientras que el Valor Presente (PV) es el valor actual de ese monto, descontado a una tasa de interés determinada.",
  },
];

// Render the AccordionTemplate component with the data
export const AccordionPresentValue = () => (
  <AccordionTemplate items={accordionData} />
);
