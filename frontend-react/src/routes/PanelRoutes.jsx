import { Routes, Route } from "react-router-dom";
import ClientePanel from "../pages/paneles/ClientePanel";
import EmprendedorPanel from "../pages/paneles/EmprendedorPanel";
import AdminPanel from "../pages/paneles/AdminPanel";
import RoleBasedRoute from "./RoleBasedRoute";

export default function PanelRoutes() {
  return (
    <Routes>
      <Route
        path="cliente"
        element={
          <RoleBasedRoute rolesPermitidos={["cliente"]}>
            <ClientePanel />
          </RoleBasedRoute>
        }
      />
      <Route
        path="emprendedor"
        element={
          <RoleBasedRoute rolesPermitidos={["emprendedor"]}>
            <EmprendedorPanel />
          </RoleBasedRoute>
        }
      />
      <Route
        path="admin"
        element={
          <RoleBasedRoute rolesPermitidos={["administrador"]}>
            <AdminPanel />
          </RoleBasedRoute>
        }
      />
    </Routes>
  );
}
