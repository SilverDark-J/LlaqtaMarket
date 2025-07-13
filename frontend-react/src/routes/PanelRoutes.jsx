// 📁 src/routes/PanelRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ClientePanel from "../pages/paneles/ClientePanel";

export default function PanelRoutes() {
  return (
    <Routes>
      <Route path="/cliente" element={<ClientePanel />} />
    </Routes>
  );
}
