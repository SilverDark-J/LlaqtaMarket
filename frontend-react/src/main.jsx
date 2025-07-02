import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ClientePanel from "./pages/paneles/ClientePanel";
import EmprendedorPanel from "./pages/paneles/EmprendedorPanel";
import AdminPanel from "./pages/paneles/AdminPanel";
import "./styles/panelCliente.css";
import "./styles/panelEmprendedor.css";
import "./styles/panelAdmin.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminPanel />
    </BrowserRouter>
  </React.StrictMode>
);
