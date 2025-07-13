// 📁 src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PanelRoutes from "./PanelRoutes";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PanelRoutes />} />
      </Routes>
    </Router>
  );
}
