import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../tremor/Accordion";

export const AccordionTemplate = () => (
  <Accordion
    type="multiple"
    className="mx-auto mt-3 max-w-sm"
    style={{ maxWidth: "1000px", width: "100%" }}
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>¿Qué es el interés compuesto?</AccordionTrigger>
      <AccordionContent>
        Es el interés calculado sobre el capital inicial y los intereses
        acumulados de periodos anteriores.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>
        ¿Qué fórmula se usa para calcular el interés compuesto?
      </AccordionTrigger>
      <AccordionContent>
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
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>
        ¿Cuál es la diferencia entre interés simple e interés compuesto?
      </AccordionTrigger>
      <AccordionContent>
        El interés simple se calcula solo sobre el capital inicial, mientras que
        el compuesto incluye los intereses acumulados.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
