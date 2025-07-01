import { useState, useEffect } from "react";
import HeaderCliente from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../../styles/panelCliente.css";

export default function ClientePanel() {
  const [seccion, setSeccion] = useState("pedidos");

  const handleSeleccion = (seccion) => {
    if (seccion === "cerrar") {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      setSeccion(seccion);
    }
  };

  return (
    <>
      <HeaderCliente nombre="Cliente" />
      <div className="contenedor">
        <Sidebar onSeleccion={handleSeleccion} />
        <main id="contenidoPrincipal">
          {seccion === "pedidos" && <MisPedidos />}
          {seccion === "config" && <ConfiguracionCliente />}
        </main>
      </div>
    </>
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
  // Puedes implementar useState para los campos de configuración

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
