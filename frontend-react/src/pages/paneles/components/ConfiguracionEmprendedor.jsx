// 📁 src/pages/paneles/components/ConfiguracionEmprendedor.jsx
import { useEffect, useState } from "react";
import {
  obtenerEmprendedor,
  actualizarEmprendedor,
} from "../../../services/emprendedorService";
import styles from "../../../styles/panelCliente.module.css";

export default function ConfiguracionEmprendedor() {
  const [datos, setDatos] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    nombre_emprendimiento: "",
    contrasenia: "",
    direccion: "",
    telefono: "",
    descripcion: "",
  });

  const [cargando, setCargando] = useState(true);

  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datosServidor = await obtenerEmprendedor();
        setDatos({
          nombres: datosServidor.nombres || "",
          apellidos: datosServidor.apellidos || "",
          correo: datosServidor.correo || "",
          nombre_emprendimiento: datosServidor.nombre_emprendimiento || "",
          contrasenia: "",
          direccion: datosServidor.direccion || "",
          telefono: datosServidor.telefono || "",
          descripcion: datosServidor.descripcion || "",
        });
      } catch (error) {
        alert("❌ Error al cargar datos del emprendedor");
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
      await actualizarEmprendedor(datos);
      alert("✅ Datos actualizados correctamente");
    } catch (error) {
      alert("❌ Error al actualizar datos");
      console.error(error);
    }
  };

  if (cargando) return <p>Cargando configuración...</p>;

  return (
    <section className={styles.configuracionContenedor}>
      <h2>Configuración</h2>
      <form className={styles.configuracionFormulario} onSubmit={handleSubmit}>
        <div className={styles.campo}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombres"
            value={datos.nombres}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.campo}>
          <label>Apellido:</label>
          <input
            type="text"
            name="apellidos"
            value={datos.apellidos}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.campo}>
          <label>Nombre del emprendimiento:</label>
          <input type="text" value={datos.nombre_emprendimiento} disabled />
        </div>
        <div className={styles.campo}>
          <label>Correo:</label>
          <input type="email" value={datos.correo} disabled />
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
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={datos.telefono}
            onChange={handleChange}
            required
            pattern="[0-9]{9}"
            title="Debe contener 9 dígitos"
          />
        </div>
        <div className={styles.campo}>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={datos.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.campo}>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.botonActualizar}>
          Actualizar
        </button>{" "}
      </form>
    </section>
  );
}
