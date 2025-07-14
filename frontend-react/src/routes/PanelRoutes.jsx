// src/routes/PanelRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ClientePanel from "../pages/paneles/ClientePanel";
import EmprendedorPanel from "../pages/paneles/EmprendedorPanel";
import AdminPanel from "../pages/paneles/AdminPanel";
import PrivateRoute from "./PrivateRoute"; // 👈 Importamos

export default function PanelRoutes() {
  return (
    <Routes>
      <Route
        path="cliente"
        element={
          <PrivateRoute>
            <ClientePanel />
          </PrivateRoute>
        }
      />
      <Route
        path="emprendedor"
        element={
          <PrivateRoute>
            <EmprendedorPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="admin"
        element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
