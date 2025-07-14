import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import "../../styles/panelAdmin.css";

import ListaClientes from "./components/ListaClientes";
import ListaEmprendedores from "./components/ListaEmprendedores";

export default function AdminPanel() {
  const [seccion, setSeccion] = useState("clientes");

  const opciones = [
    { id: "clientes", nombre: "Clientes" },
    { id: "emprendedores", nombre: "Emprendedores" },
    { id: "cerrar", nombre: "Cerrar Sesión" },
  ];

  const handleSeleccion = (opcion) => {
    if (opcion === "cerrar") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      setSeccion(opcion);
    }
  };

  return (
    <PanelLayout
      nombreUsuario="Administrador"
      onSeleccion={handleSeleccion}
      opciones={opciones}
      opcionActiva={seccion}
    >
      {seccion === "clientes" && <ListaClientes />}
      {seccion === "emprendedores" && <ListaEmprendedores />}
    </PanelLayout>
  );
}
