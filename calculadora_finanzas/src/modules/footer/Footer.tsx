import "./Footer.css";
interface Props {}

export const FooterPage: React.FC<Props> = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <strong>Calculadora Finanzas</strong> es una herramienta gratuita que
          te permite calcular el interés compuesto de tus inversiones.
        </p>
        <p>
          <strong>Calculadora Finanzas</strong> no se hace responsable de los
          resultados obtenidos con esta herramienta.
        </p>
        <p>
          <strong>Calculadora Finanzas</strong> no almacena información personal
          de los usuarios.
        </p>
      </div>
    </footer>
  );
};
