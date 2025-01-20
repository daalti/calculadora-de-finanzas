import "./App.css";
import { CompoundInterest } from "./pages/calculator/CompundInterest";
import { PresentValue } from "./pages/calculator/PresentValue";
import { ReturnRate } from "./pages/calculator/ReturnRate";
import { AverageStock } from "./pages/calculator/AverageStock";
import { IRPF } from "./pages/calculator/IRPF";
import { CalculatorInitial } from "./pages/calculator/CalculatorInitial";
import { GlosarioFileTemplate } from "./pages/glosario/GlosarioFileTemplate";
import { Routes, Route } from "react-router-dom";
import { getGlossaryTerms, getTesisFiles } from "./utils/getGlossaryTerms";
import { TesisFileTemplate } from "./pages/tesis/tesisFileTemplate";

function App(): JSX.Element {
  const glossaryTerms = getGlossaryTerms();
  const TesisFiles = getTesisFiles();

  return (
    <Routes>
      <Route path="/" element={<CompoundInterest />} />
      <Route path="/calculadoras" element={<CalculatorInitial />} />
      <Route path="/valor-presente" element={<PresentValue />} />
      <Route path="/tasa-de-retorno" element={<ReturnRate />} />
      <Route path="/promedio-acciones" element={<AverageStock />} />
      <Route path="/calculadora-IRPF-2025" element={<IRPF />} />
      {TesisFiles.map((file) => (
        <Route
          key={file}
          path={`/${file}`}
          element={<TesisFileTemplate title={file} />}
        />
      ))}
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
