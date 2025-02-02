import { AccordionTemplate } from "./AccordionTemplate";
const accordionData = [
  {
    question: "¿Qué es el Promedio de Acciones?",
    answer:
      "El Promedio de Acciones se refiere al número medio de acciones en circulación durante un periodo determinado. Es una medida clave para analizar la evolución del capital accionario y para el cálculo de indicadores financieros como el EPS (Beneficio por Acción).",
  },
  {
    question: "¿Por qué es importante calcular el Promedio de Acciones?",
    answer:
      "Calcular el Promedio de Acciones permite a los analistas y a la empresa entender mejor cómo varía la base accionaria a lo largo del tiempo, facilitando comparaciones precisas entre distintos periodos y ayudando en la evaluación del rendimiento financiero.",
  },
  {
    question: "¿Cómo se calcula el Promedio de Acciones?",
    answer: (
      <>
        <p>
          El cálculo básico del Promedio de Acciones se realiza sumando el
          número de acciones al inicio y al final del periodo, y dividiendo el
          resultado entre dos:
        </p>
        <code>
          Promedio de Acciones = (Acciones Iniciales + Acciones Finales) / 2
        </code>
        <p>
          Cuando hay cambios significativos durante el periodo, se utiliza un
          promedio ponderado según el tiempo que cada cantidad estuvo en
          circulación.
        </p>
      </>
    ),
  },
  {
    question: "¿Qué es el Promedio Ponderado de Acciones?",
    answer:
      "El Promedio Ponderado de Acciones tiene en cuenta los cambios en el número de acciones a lo largo del tiempo, asignando un peso proporcional al tiempo que cada cantidad estuvo en circulación. Esto ofrece una medida más precisa para el análisis financiero, especialmente al calcular el EPS.",
  },
  {
    question: "¿Cómo afecta el Promedio de Acciones al cálculo del EPS?",
    answer:
      "El EPS (Beneficio por Acción) se calcula dividiendo el beneficio neto entre el Promedio de Acciones. Un incremento en el número de acciones puede diluir el EPS, mientras que una reducción lo incrementa, afectando la valoración y el rendimiento percibido de la empresa.",
  },
  {
    question:
      "¿Qué factores pueden influir en la variación del número de acciones en circulación?",
    answer:
      "Entre los factores que pueden afectar el número de acciones se encuentran la emisión de nuevas acciones, la recompra de acciones por parte de la empresa, la conversión de deuda o acciones preferentes y otros cambios estructurales en el capital social.",
  },
];

// Render the AccordionTemplate component with the data
export const AccordionAverageStock = () => (
  <AccordionTemplate items={accordionData} />
);
