import "./App.css";
import { CompoundInterest } from "./pages/calculator/CompundInterest";
import { PresentValue } from "./pages/calculator/PresentValue";
import { ReturnRate } from "./pages/calculator/ReturnRate";
import { AverageStock } from "./pages/calculator/AverageStock";
import { GlosarioFileTemplate } from "./pages/glosario/GlosarioFileTemplate";
import { Routes, Route } from "react-router-dom";
import { getGlossaryTerms } from "./utils/getGlossaryTerms";

function App(): JSX.Element {
  const glossaryTerms = getGlossaryTerms();

  return (
    <Routes>
      <Route path="/" element={<CompoundInterest />} />
      <Route path="/valor-presente" element={<PresentValue />} />
      <Route path="/tasa-de-retorno" element={<ReturnRate />} />
      <Route path="/promedio-acciones" element={<AverageStock />} />
      {glossaryTerms.map((term) => (
        <Route
          key={term}
          path={`/${term}`}
          element={<GlosarioFileTemplate title={term} />}
        />
      ))}
    </Routes>
  );
}

export default App;
