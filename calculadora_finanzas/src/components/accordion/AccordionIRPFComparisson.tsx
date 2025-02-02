import { AccordionTemplate } from "./AccordionTemplate";
const accordionData = [
  {
    question: "¿Qué es la Comparación del IRPF entre Comunidades Autónomas?",
    answer:
      "La comparación del IRPF entre Comunidades Autónomas se refiere al análisis de las diferencias en la tributación del Impuesto sobre la Renta de las Personas Físicas que aplican las distintas regiones de España. Estas variaciones pueden afectar tanto las escalas impositivas como las deducciones y bonificaciones, modificando la carga fiscal para los contribuyentes en cada comunidad.",
  },
  {
    question:
      "¿Por qué existen diferencias en el IRPF entre las Comunidades Autónomas?",
    answer:
      "Aunque el IRPF es un impuesto estatal, las Comunidades Autónomas tienen competencias para modificar ciertos aspectos del mismo, como deducciones autonómicas, bonificaciones y, en algunos casos, tramos adicionales en la escala. Esto permite adaptar la política fiscal a las necesidades y objetivos económicos de cada región.",
  },
  {
    question:
      "¿Qué factores influyen en la variación del IRPF entre Comunidades Autónomas?",
    answer:
      "Los factores que influyen incluyen las decisiones legislativas autonómicas, las prioridades en gasto público, la inversión en servicios sociales y educativos, y las condiciones económicas y demográficas propias de cada comunidad. Estos elementos hacen que la carga fiscal y las deducciones puedan variar significativamente de una región a otra.",
  },
  {
    question:
      "¿Cómo se comparan las escalas y deducciones del IRPF entre Comunidades Autónomas?",
    answer:
      "Cada Comunidad Autónoma puede establecer escalas de gravamen y deducciones específicas que complementan el régimen estatal. Esto significa que, para contribuyentes con perfiles similares, la cantidad a pagar o devolver puede diferir en función de la comunidad en la que residan, al ajustar los tramos impositivos y las deducciones aplicables.",
  },
  {
    question:
      "¿Qué ejemplos de diferencias se observan en el IRPF entre Comunidades Autónomas?",
    answer:
      "Por ejemplo, algunas comunidades ofrecen deducciones adicionales por inversión en vivienda habitual, gastos por familia numerosa o donaciones, mientras que otras pueden tener tipos impositivos más elevados en ciertos tramos. Estas diferencias se reflejan en la cantidad final a pagar y pueden influir en la competitividad fiscal de cada región.",
  },
  {
    question:
      "¿Cuál es el impacto de estas diferencias en la economía regional?",
    answer:
      "Las variaciones en el IRPF pueden afectar la atracción de residentes y empresas, la movilidad laboral y la recaudación fiscal. Una política fiscal más favorable puede incentivar el crecimiento económico y la inversión, mientras que tasas más elevadas pueden limitar el poder adquisitivo y afectar el desarrollo regional.",
  },
];

// Render the AccordionTemplate component with the data
export const AccordionIRPFComparisson = () => (
  <AccordionTemplate items={accordionData} />
);
