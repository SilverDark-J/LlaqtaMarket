// src/routes/PublicRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegistroClientePage from "../pages/auth/RegistroClientePage";
import RegistroEmprendedorPage from "../pages/auth/RegistroEmprendedorPage";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro_cliente" element={<RegistroClientePage />} />
      <Route
        path="/registro_emprendedor"
        element={<RegistroEmprendedorPage />}
      />
    </Routes>
  );
}
