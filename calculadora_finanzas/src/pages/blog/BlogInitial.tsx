import { CalculatorPageTemplate } from "../calculator/CalculatorPageTemplate";
const BLOG_WELCOME_MESSAGE = (
  <>
    ¡Bienvenidos a mi <strong>blog</strong>! Aquí encontrarás un variado abanico
    de temas que van desde <strong>economía</strong> y <strong>política</strong>{" "}
    hasta <strong>cine</strong> y <strong>libros</strong>, ¡y todo lo que vaya
    surgiendo en el camino!
  </>
);
interface Props {}

export const BlogInitial: React.FC<Props> = () => {
  return (
    <CalculatorPageTemplate
      title="Blogs"
      message={BLOG_WELCOME_MESSAGE}
      type="BlogInitial"
    />
  );
};
