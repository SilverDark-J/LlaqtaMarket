import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import MisProductos from "./components/MisProductos";
import AgregarProducto from "./components/AgregarProducto";
import ConfiguracionEmprendedor from "./components/ConfiguracionEmprendedor";

export default function EmprendedorPanel() {
  const [seccion, setSeccion] = useState("configuracion");

  const opciones = [
    { id: "productos", nombre: "Mis Productos" },
    { id: "agregar", nombre: "Agregar Producto" },
    { id: "configuracion", nombre: "Configuración" },
    { id: "cerrar", nombre: "Cerrar Sesión" },
  ];

  const handleSeleccion = (opcion) => {
    if (opcion === "cerrar") {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      setSeccion(opcion);
    }
  };

  return (
    <PanelLayout
      nombreUsuario="Emprendedor"
      onSeleccion={handleSeleccion}
      opciones={opciones}
      opcionActiva={seccion}
    >
      {seccion === "productos" && <MisProductos />}
      {seccion === "agregar" && <AgregarProducto />}
      {seccion === "configuracion" && <ConfiguracionEmprendedor />}
    </PanelLayout>
  );
}
