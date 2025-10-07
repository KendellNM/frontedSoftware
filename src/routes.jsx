import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPages";
import EmpresaGrid from "./components/organisms/EmpresaGrid";
import EmpresaCreate from "./components/pages/EmpresaCreate";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/formulario" element={<LoginPage />} />
      <Route path="/elegir-empresa" element={<h1 className="Hola">Hola</h1>} />
      <Route path="/empresas" element={<EmpresaGrid />} />
      <Route path="/elegir-empresa/nueva" element={<EmpresaCreate />} />
    </Routes>
  );
}
