import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../tremor/Accordion";

interface AccordionItem {
  question: string;
  answer: string | JSX.Element;
}

interface AccordionTemplateProps {
  items: AccordionItem[];
}

export const AccordionTemplate = ({ items }: AccordionTemplateProps) => (
  <Accordion
    type="multiple"
    className="mx-auto mt-3 max-w-sm"
    style={{ maxWidth: "1000px", width: "100%" }}
  >
    {items.map((item, index) => (
      <AccordionItem key={index} value={`item-${index + 1}`}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
