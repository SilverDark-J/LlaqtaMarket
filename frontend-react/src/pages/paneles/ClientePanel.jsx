import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import "../../styles/panelCliente.css";

export default function ClientePanel() {
  const [seccion, setSeccion] = useState("pedidos");

  const opcionesCliente = [
    { id: "pedidos", nombre: "Mis Pedidos" },
    { id: "config", nombre: "Configuración" },
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
      nombreUsuario="Cliente"
      onSeleccion={handleSeleccion}
      opcionesSidebar={opcionesCliente}
      seccionActual={seccion}
    >
      {seccion === "pedidos" && <MisPedidos />}
      {seccion === "config" && <ConfiguracionCliente />}
    </PanelLayout>
  );
}

function MisPedidos() {
  return (
    <section>
      <h2>Mis Pedidos</h2>
      <div className="productos-grid">
        {/* Aquí iría el mapeo de pedidos */}
      </div>
    </section>
  );
}

function ConfiguracionCliente() {
  return (
    <section className="contenedor-configuracion">
      <h2>Configuración</h2>
      <form
        className="formulario-configuracion"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="campo">
          <label htmlFor="clienteNombre">Nombres:</label>
          <input type="text" id="clienteNombre" />
        </div>
        <div className="campo">
          <label htmlFor="clienteApellido">Apellidos:</label>
          <input type="text" id="clienteApellido" />
        </div>
        <div className="campo">
          <label htmlFor="clienteCorreo">Correo:</label>
          <input type="email" id="clienteCorreo" disabled />
        </div>
        <div className="campo">
          <label htmlFor="clienteContrasena">Contraseña:</label>
          <input
            type="password"
            id="clienteContrasena"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="clienteDireccion">Dirección:</label>
          <input type="text" id="clienteDireccion" />
        </div>
        <div className="campo">
          <label htmlFor="clienteTelefono">Teléfono:</label>
          <input type="tel" id="clienteTelefono" />
        </div>
        <div className="campo">
          <label htmlFor="clienteFechaRegistro">Fecha de Registro:</label>
          <input type="text" id="clienteFechaRegistro" disabled />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </section>
  );
}
