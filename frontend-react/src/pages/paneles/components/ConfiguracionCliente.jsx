// 📁 src/pages/paneles/components/ConfiguracionCliente.jsx
import { useEffect, useState } from "react";
import {
  obtenerCliente,
  actualizarCliente,
} from "../../../services/clienteService";
import styles from "../../../styles/panelCliente.module.css";

export default function ConfiguracionCliente() {
  const [datos, setDatos] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    direccion: "",
    telefono: "",
    contrasenia: "",
    fecha_registro: "",
  });

  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cliente = await obtenerCliente();
        setDatos({
          nombres: cliente.nombres || "",
          apellidos: cliente.apellidos || "",
          correo: cliente.correo || "",
          direccion: cliente.direccion || "",
          telefono: cliente.telefono || "",
          contrasenia: "",
          fecha_registro: cliente.fecha_registro?.split("T")[0] || "",
        });
      } catch (error) {
        alert("Error al cargar datos del cliente");
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarCliente(datos);
      alert("✅ Datos actualizados correctamente");
    } catch (error) {
      alert("❌ Error al actualizar datos");
      console.error(error);
    }
  };

  if (cargando) {
    return <p>Cargando configuración...</p>;
  }

  return (
    <section className={styles.configuracionContenedor}>
      <h2>Configuración</h2>
      <form className={styles.configuracionFormulario} onSubmit={handleSubmit}>
        <div className={styles.campo}>
          <label htmlFor="clienteNombre">Nombres:</label>
          <input
            type="text"
            id="clienteNombre"
            name="nombres"
            value={datos.nombres}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="clienteApellido">Apellidos:</label>
          <input
            type="text"
            id="clienteApellido"
            name="apellidos"
            value={datos.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="clienteCorreo">Correo:</label>
          <input
            type="email"
            id="clienteCorreo"
            name="correo"
            value={datos.correo}
            disabled
          />
        </div>

        <div className={styles.campo}>
          <div className={styles.campo}>
            <label htmlFor="clienteContrasena">Contraseña:</label>
            <div className={styles.contrasenaInputWrapper}>
              <input
                type={mostrarContrasena ? "text" : "password"}
                id="clienteContrasena"
                name="contrasenia"
                placeholder="••••••••"
                value={datos.contrasenia}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                className={styles.toggleBtn}
                title={
                  mostrarContrasena
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                <i
                  className={`fas ${
                    mostrarContrasena ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.campo}>
          <label htmlFor="clienteDireccion">Dirección:</label>
          <input
            type="text"
            id="clienteDireccion"
            name="direccion"
            value={datos.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="clienteTelefono">Teléfono:</label>
          <input
            type="tel"
            id="clienteTelefono"
            name="telefono"
            value={datos.telefono}
            onChange={handleChange}
            required
            pattern="[0-9]{9}"
            title="Debe contener 9 dígitos"
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="clienteFechaRegistro">Fecha de Registro:</label>
          <input
            type="text"
            id="clienteFechaRegistro"
            name="fecha_registro"
            value={datos.fecha_registro}
            disabled
          />
        </div>

        <button type="submit" className={styles.botonActualizar}>
          Actualizar
        </button>
      </form>
    </section>
  );
}
