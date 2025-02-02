import { AccordionTemplate } from "./AccordionTemplate";
const accordionData = [
  {
    question: "¿Qué es el Coste Laboral?",
    answer:
      "El coste laboral se refiere al conjunto de gastos que una empresa incurre para mantener a su personal, incluyendo salarios, cargas sociales, contribuciones a la seguridad social y otros beneficios. Es un indicador clave para evaluar la eficiencia y rentabilidad de una organización.",
  },
  {
    question: "¿Qué componentes integran el Coste Laboral?",
    answer:
      "El coste laboral incluye los salarios brutos, las contribuciones a la seguridad social, seguros, bonificaciones, incentivos, y otros beneficios adicionales como formación o servicios de salud, que se suman al gasto total que representa el empleo del personal.",
  },
  {
    question:
      "¿Por qué es importante analizar el Coste Laboral en una empresa?",
    answer:
      "Analizar el coste laboral es fundamental para controlar y optimizar los gastos en recursos humanos. Un adecuado manejo de estos costos ayuda a mejorar la competitividad, maximizar la rentabilidad y asegurar la sostenibilidad financiera de la empresa a largo plazo.",
  },
  {
    question: "¿Cómo se calcula el Coste Laboral?",
    answer:
      "El cálculo del coste laboral se realiza sumando todos los gastos asociados al personal durante un período determinado. Esto incluye el salario bruto, las cargas sociales y cualquier otro gasto o beneficio que la empresa deba abonar a sus empleados.",
  },
  {
    question:
      "¿Qué impacto tiene el Coste Laboral en la competitividad de una empresa?",
    answer:
      "Un coste laboral elevado puede reducir los márgenes de beneficio y afectar la competitividad en el mercado. Sin embargo, una inversión en personal cualificado y motivado puede mejorar la productividad y la calidad del trabajo, generando beneficios a largo plazo.",
  },
  {
    question: "¿Cómo puede una empresa optimizar su Coste Laboral?",
    answer:
      "Para optimizar el coste laboral, las empresas pueden implementar estrategias como la automatización de procesos, la revisión y adecuación de la estructura salarial, la formación continua y la implementación de políticas de incentivos. Todo ello contribuye a un uso más eficiente de los recursos humanos y a la reducción de gastos innecesarios.",
  },
];

// Render the AccordionTemplate component with the data
export const AccordionLaboralCost = () => (
  <AccordionTemplate items={accordionData} />
);
