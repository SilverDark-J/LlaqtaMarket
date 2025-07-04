import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegistroClientePage from "./pages/auth/RegistroClientePage";
import RegistroEmprendedorPage from "./pages/auth/RegistroEmprendedorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro_cliente" element={<RegistroClientePage />} />
        <Route path="/registro_emprendedor" element={<RegistroEmprendedorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
