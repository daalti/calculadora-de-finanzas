import { AccordionTemplate } from "./AccordionTemplate";
const accordionData = [
  {
    question: "¿Qué es el IRPF?",
    answer:
      "El IRPF (Impuesto sobre la Renta de las Personas Físicas) es un tributo que grava la renta obtenida por los ciudadanos, incluyendo ingresos del trabajo, ganancias patrimoniales y otros rendimientos. Es uno de los principales impuestos que se aplican a nivel personal en muchos países de habla hispana.",
  },
  {
    question: "¿Cómo se calcula el IRPF?",
    answer: (
      <>
        <p>
          El cálculo del IRPF se realiza sumando todos los ingresos obtenidos
          durante el año y restando las deducciones y reducciones aplicables.
          Posteriormente, se aplica una escala progresiva de gravamen, lo que
          significa que a medida que aumenta la base imponible, se incrementa el
          porcentaje de impuestos a pagar.
        </p>
      </>
    ),
  },
  {
    question: "¿Cuáles son algunas de las deducciones comunes en el IRPF?",
    answer:
      "Entre las deducciones más habituales se encuentran las relacionadas con la inversión en vivienda habitual, las donaciones a entidades benéficas, las aportaciones a planes de pensiones y los gastos por guardería, entre otras.",
  },
  {
    question: "¿Qué son las escalas de gravamen en el IRPF?",
    answer: (
      <>
        <p>
          Las escalas de gravamen son tramos de la base imponible a los que se
          aplica un tipo impositivo específico. Este sistema progresivo busca
          que las personas con mayores ingresos contribuyan en mayor medida, ya
          que a medida que aumenta la base, también lo hace el porcentaje de
          impuesto a pagar.
        </p>
      </>
    ),
  },
  {
    question: "¿Cómo se presenta la declaración del IRPF?",
    answer:
      "La declaración del IRPF se presenta de forma anual a través de la Agencia Tributaria, ya sea de manera telemática o en papel, dependiendo de la normativa vigente y las preferencias del contribuyente.",
  },
  {
    question:
      "¿Por qué es importante realizar correctamente la declaración del IRPF?",
    answer:
      "Realizar correctamente la declaración del IRPF es fundamental para evitar sanciones y recargos. Además, asegura que el contribuyente aproveche todas las deducciones y reducciones a las que tiene derecho, optimizando así su carga fiscal.",
  },
];

// Render the AccordionTemplate component with the data
export const AccordionIRPF = () => <AccordionTemplate items={accordionData} />;
