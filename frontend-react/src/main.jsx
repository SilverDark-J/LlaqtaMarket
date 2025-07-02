import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ClientePanel from "./pages/paneles/ClientePanel";
import "./styles/panelCliente.css";
import EmprendedorPanel from "./pages/paneles/EmprendedorPanel";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientePanel />
    </BrowserRouter>
  </React.StrictMode>
);
