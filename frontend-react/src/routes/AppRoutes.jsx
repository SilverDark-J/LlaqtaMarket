// ✅ src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PanelRoutes from "./PanelRoutes";
// import AuthRoutes from "./AuthRoutes"; // aún no se usa

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* 1. Primero las rutas de paneles (protegidas) */}
        <Route path="/panel/*" element={<PanelRoutes />} />

        {/* 2. Luego las rutas públicas */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Router>
  );
}
