import { AccordionTemplate } from "./AccordionTemplate";

// Define your accordion data with additional compound interest questions
const accordionData = [
  {
    question: "¿Qué es el interés compuesto?",
    answer:
      "Es el interés calculado sobre el capital inicial y los intereses acumulados de periodos anteriores.",
  },
  {
    question: "¿Qué fórmula se usa para calcular el interés compuesto?",
    answer: (
      <>
        <code>
          A = P × (1 + r/n)<sup>n × t</sup>
        </code>
        <ul>
          <li>
            <strong>A:</strong> Monto final
          </li>
          <li>
            <strong>P:</strong> Capital inicial
          </li>
          <li>
            <strong>r:</strong> Tasa de interés anual
          </li>
          <li>
            <strong>n:</strong> Frecuencia de capitalización
          </li>
          <li>
            <strong>t:</strong> Tiempo en años
          </li>
        </ul>
      </>
    ),
  },
  {
    question:
      "¿Cuál es la diferencia entre interés simple e interés compuesto?",
    answer:
      "El interés simple se calcula solo sobre el capital inicial, mientras que el compuesto incluye los intereses acumulados.",
  },
  {
    question: "¿Cómo afecta la frecuencia de capitalización al monto final?",
    answer:
      "Una mayor frecuencia de capitalización (por ejemplo, mensual en lugar de anual) resulta en un monto final mayor, ya que el interés se acumula con más frecuencia sobre los intereses previamente ganados.",
  },
  {
    question: "¿Qué es la tasa nominal y la tasa efectiva?",
    answer:
      "La tasa nominal es la tasa de interés anual sin tener en cuenta la capitalización, mientras que la tasa efectiva incorpora el efecto de la capitalización, mostrando el rendimiento real de la inversión.",
  },
  {
    question: "¿Cómo se calcula el tiempo para duplicar una inversión?",
    answer:
      "Una forma aproximada es utilizando la regla del 72, que consiste en dividir 72 entre la tasa de interés anual. Por ejemplo, a una tasa del 8%, el tiempo estimado para duplicar la inversión es 72 / 8 = 9 años.",
  },
  {
    question: "¿Qué es la capitalización continua?",
    answer: (
      <>
        <p>
          La capitalización continua asume que el interés se acumula de manera
          constante en cada instante. La fórmula para calcular el monto final
          es:
        </p>
        <code>A = Pe^(r × t)</code>
      </>
    ),
  },
];

// Render the AccordionTemplate component with the data
export const AccordionComnpountInterest = () => (
  <AccordionTemplate items={accordionData} />
);
