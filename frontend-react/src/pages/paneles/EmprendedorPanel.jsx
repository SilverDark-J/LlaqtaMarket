import { useEffect, useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import MisProductos from "./components/MisProductos";
import AgregarProducto from "./components/AgregarProducto";
import ConfiguracionEmprendedor from "./components/ConfiguracionEmprendedor";
import ReporteVentasEmprendedor from "./components/ReporteVentasEmprendedor";
import { obtenerEmprendedor } from "../../services/emprendedorService";

export default function EmprendedorPanel() {
  const [seccion, setSeccion] = useState("configuracion");
  const [nombreEmprendedor, setNombreEmprendedor] = useState("Emprendedor");
  const [productoEditar, setProductoEditar] = useState(null); // 👈 nuevo

  const opciones = [
    { id: "productos", nombre: "Mis Productos" },
    { id: "agregar", nombre: "Agregar Producto" },
    { id: "reportes", nombre: "Reportes" },
    { id: "configuracion", nombre: "Configuración" },
    { id: "cerrar", nombre: "Cerrar Sesión" },
  ];

  const handleSeleccion = (opcion) => {
    if (opcion === "cerrar") {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      setSeccion(opcion);
      if (opcion !== "agregar") setProductoEditar(null); // Limpiar si se va a otra sección
    }
  };

  useEffect(() => {
    const cargarNombre = async () => {
      try {
        const emprendedor = await obtenerEmprendedor();
        setNombreEmprendedor(
          emprendedor.nombre_emprendimiento || "Emprendedor"
        );
      } catch (error) {
        console.error("Error al cargar nombre del emprendedor:", error);
      }
    };
    cargarNombre();
  }, []);

  return (
    <PanelLayout
      nombreUsuario={nombreEmprendedor}
      onSeleccion={handleSeleccion}
      opciones={opciones}
      opcionActiva={seccion}
    >
      {seccion === "productos" && (
        <MisProductos
          onEditarProducto={(producto) => {
            setProductoEditar(producto);
            setSeccion("agregar");
          }}
        />
      )}
      {seccion === "agregar" && (
        <AgregarProducto
          productoEditar={productoEditar}
          onGuardado={() => {
            setProductoEditar(null);
            setSeccion("productos");
          }}
        />
      )}
      {seccion === "configuracion" && <ConfiguracionEmprendedor />}
      {seccion === "reportes" && <ReporteVentasEmprendedor />}
    </PanelLayout>
  );
}
