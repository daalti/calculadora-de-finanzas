import "./App.css";
import { CompoundInterest } from "./pages/calculator/CompundInterest";
import { PresentValue } from "./pages/calculator/PresentValue";
import { ReturnRate } from "./pages/calculator/ReturnRate";
import { AverageStock } from "./pages/calculator/AverageStock";
import { IRPF } from "./pages/calculator/IRPF";
import { CalculatorInitial } from "./pages/calculator/CalculatorInitial";
import { BlogInitial } from "./pages/blog/BlogInitial";
import { GlosarioInitial } from "./pages/glosario/GlosarioInitial";
import { TesisInitial } from "./pages/tesis/TesisInitial";
import { GlosarioFileTemplate } from "./pages/glosario/GlosarioFileTemplate";
import { BlogFileTemplate } from "./pages/blog/BlogFileTemplate";
import { IRPFComparison } from "./pages/calculator/IRPFComparison";
import { LaboralCost } from "./pages/calculator/LaboralCost";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getGlossaryTerms,
  getTesisFiles,
  getBlogsFiles,
} from "./utils/getGlossaryTerms";
import { TesisFileTemplate } from "./pages/tesis/tesisFileTemplate";

function App(): JSX.Element {
  const [glossaryTerms, setGlossaryTerms] = useState<string[]>([]);
  const [blogsFiles, setBlogsFiles] = useState<string[]>([]);
  const [tesisFiles, setTesisFiles] = useState<string[]>([]);

  useEffect(() => {
    console.log("useEffect triggered"); // 🔍 Verificar si se ejecuta el useEffect
    const fetchData = async () => {
      try {
        const glossary = await getGlossaryTerms();
        const blogs = await getBlogsFiles();
        const tesis = await getTesisFiles();

        console.log("Blogs data:", blogs); // 👀 Asegúrate de que esto aparece

        setGlossaryTerms(glossary);
        setBlogsFiles(blogs);
        setTesisFiles(tesis);
      } catch (error) {
        console.error("Error fetching data:", error); // ⚠️ Captura errores
      }
    };

    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<CompoundInterest />} />
      <Route path="/calculadoras" element={<CalculatorInitial />} />
      <Route path="/blogs" element={<BlogInitial />} />
      <Route path="/glosario" element={<GlosarioInitial />} />
      <Route path="/tesis" element={<TesisInitial />} />
      <Route path="/valor-presente" element={<PresentValue />} />
      <Route path="/tasa-de-retorno" element={<ReturnRate />} />
      <Route path="/promedio-acciones" element={<AverageStock />} />
      <Route path="/calculadora-IRPF-2025" element={<IRPF />} />
      <Route
        path="/calculadora-IRPF-comparacion-comunidades-autonomas"
        element={<IRPFComparison />}
      />
      <Route path="/coste-laboral" element={<LaboralCost />} />

      {tesisFiles.map((file) => (
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

      {blogsFiles.map((file) => (
        <Route
          key={file}
          path={`/${file}`}
          element={<BlogFileTemplate title={file} />}
        />
      ))}
    </Routes>
  );
}

export default App;
