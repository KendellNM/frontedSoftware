import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPages";
import EmpresasPage from "./components/pages/EmpresasPage";
import EmpresaCreate from "./components/pages/EmpresaCreate";
import { ProtectedRoute, PublicOnlyRoute } from "./components/routes/ProtectedRoute";
import HomePage from "./components/pages/HomePage";
import ElegirEmpresa from "./components/pages/ElegirEmpresa";
import PracticasPage from "./components/pages/PracticasPage";
import ValidarEmpresasPage from "./components/pages/ValidarEmpresasPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/formulario" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}> 
        <Route path="/home" element={<HomePage />} />
        <Route path="/elegir-empresa" element={<ElegirEmpresa />} />
        <Route path="/elegir-empresa/empresas" element={<EmpresasPage />} />
        <Route path="/elegir-empresa/nueva" element={<EmpresaCreate />} />
        <Route path="/practicas" element={<PracticasPage />} />
        <Route path="/coordinador/validar-empresas" element={<ValidarEmpresasPage />} />
      </Route>
    </Routes>
  );
}
