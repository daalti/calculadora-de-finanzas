import "./App.css";
import { CompoundInterest } from "./pages/compoundInterest/CompundInterest";
import { PresentValue } from "./pages/compoundInterest/PresentValue";
import { Routes, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<CompoundInterest />} />
      <Route path="/valor-presente" element={<PresentValue />} />
    </Routes>
  );
}

export default App;
