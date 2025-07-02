import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import "../../styles/panelAdmin.css"; // crea este archivo para tus estilos

export default function AdminPanel() {
  const [seccion, setSeccion] = useState("usuarios");

  const opciones = [
    { id: "usuarios", nombre: "Usuarios" },
    { id: "emprendedores", nombre: "Emprendedores" },
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
      nombreUsuario="Administrador"
      onSeleccion={handleSeleccion}
      opciones={opciones}
      opcionActiva={seccion}
    >
      {seccion === "usuarios" && <Usuarios />}
      {seccion === "emprendedores" && <Emprendedores />}
    </PanelLayout>
  );
}

function Usuarios() {
  return (
    <section>
      <h2>Gestión de Usuarios</h2>
      <table className="tabla">
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Fecha de Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="listaUsuarios">
          {/* Aquí irá el mapeo dinámico de usuarios */}
        </tbody>
      </table>
    </section>
  );
}

function Emprendedores() {
  return (
    <section>
      <h2>Gestión de Emprendedores</h2>
      <table className="tabla">
        <thead>
          <tr>
            <th>ID Emprendedor</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Emprendimiento</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Fecha de Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="listaEmprendedores">
          {/* Aquí irá el mapeo dinámico de emprendedores */}
        </tbody>
      </table>
    </section>
  );
}
