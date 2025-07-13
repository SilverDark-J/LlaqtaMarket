import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Registros y Login
import LoginPage from "./pages/auth/LoginPage";
import RegistroClientePage from "./pages/auth/RegistroClientePage";
import RegistroEmprendedorPage from "./pages/auth/RegistroEmprendedorPage";

// Paneles
import AdminPanel from "./pages/paneles/AdminPanel";
import ClientePanel from "./pages/paneles/ClientePanel";
import EmprendedorPanel from "./pages/paneles/EmprendedorPanel";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de autenticación y registro */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro_cliente" element={<RegistroClientePage />} />
        <Route
          path="/registro_emprendedor"
          element={<RegistroEmprendedorPage />}
        />

        {/* Rutas de paneles de administración, clientes y emprendedores */}
        <Route path="/panel_cliente" element={<ClientePanel />} />
        <Route path="/panel_emprendedor" element={<EmprendedorPanel />} />
        <Route path="/panel_administrador" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
