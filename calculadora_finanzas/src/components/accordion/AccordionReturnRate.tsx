import { AccordionTemplate } from "./AccordionTemplate";
const accordionData = [
  {
    question: "¿Qué es la tasa de retorno (CAGR)?",
    answer:
      "La tasa de retorno (o CAGR, por sus siglas en inglés, Compound Annual Growth Rate) mide el crecimiento promedio anual de una inversión durante un periodo de tiempo, teniendo en cuenta el efecto del interés compuesto. Es clave para comparar el rendimiento de diferentes inversiones y evaluar su rentabilidad.",
  },
  {
    question: "¿Cuál es la fórmula para calcular el CAGR?",
    answer: (
      <>
        <p>La fórmula para calcular el CAGR es:</p>
        <code>CAGR = (FV / PV)^(1/t) - 1</code>
        <ul>
          <li>
            <strong>FV:</strong> Valor final de la inversión
          </li>
          <li>
            <strong>PV:</strong> Valor inicial de la inversión
          </li>
          <li>
            <strong>t:</strong> Número de periodos (generalmente en años)
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "¿Cómo se interpreta la tasa de retorno?",
    answer:
      "La tasa de retorno expresa el crecimiento anual promedio de una inversión. Un CAGR positivo indica crecimiento, mientras que uno negativo refleja una disminución en el valor de la inversión a lo largo del tiempo.",
  },
  {
    question: "¿Por qué es importante el CAGR en la evaluación de inversiones?",
    answer:
      "El CAGR permite comparar de manera uniforme el rendimiento de inversiones con diferentes duraciones y estructuras de flujo de efectivo, facilitando la toma de decisiones informadas sobre dónde invertir.",
  },
  {
    question: "¿Qué limitaciones tiene el uso del CAGR?",
    answer:
      "Aunque el CAGR proporciona una visión simplificada del crecimiento, no refleja las fluctuaciones intermedias ni el riesgo asociado a la inversión. Además, asume un crecimiento constante, lo cual puede no ser realista en mercados volátiles.",
  },
  {
    question: "¿Cómo se utiliza el CAGR para comparar inversiones?",
    answer:
      "El CAGR se emplea para evaluar y comparar el rendimiento de distintas inversiones, incluso cuando tienen duraciones o estructuras de flujo de efectivo diferentes. Esto ayuda a identificar cuál inversión ha generado un crecimiento anual promedio mayor durante un periodo determinado.",
  },
];

// Render the AccordionTemplate component with the data
export const AccordionReturnRate = () => (
  <AccordionTemplate items={accordionData} />
);
