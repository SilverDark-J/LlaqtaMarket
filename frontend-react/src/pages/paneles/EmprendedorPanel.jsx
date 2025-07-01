import { useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import "../../styles/panelEmprendedor.css";

export default function EmprendedorPanel() {
  const [seccion, setSeccion] = useState("productos");

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
      nombreUsuario="Mi Emprendimiento"
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

function MisProductos() {
  return (
    <section className="contenedor-mis-productos">
      <h2>Mis Productos</h2>
      <div className="productos-grid">
        {/* Aquí irá el listado de productos del emprendedor */}
      </div>
    </section>
  );
}

function AgregarProducto() {
  return (
    <section className="contenedor-agregar-producto">
      <h2>Agregar Producto</h2>
      <form className="formulario-agregar" onSubmit={(e) => e.preventDefault()}>
        <div className="campo">
          <label htmlFor="nombreProducto">Nombre del producto:</label>
          <input type="text" id="nombreProducto" required />
        </div>
        <div className="campo">
          <label htmlFor="precioProducto">Precio:</label>
          <input type="number" id="precioProducto" required />
        </div>
        <div className="campo">
          <label htmlFor="categoriaProducto">Categoría:</label>
          <select id="categoriaProducto" required>
            <option value="">Seleccione una categoría</option>
            <option value="Ropa">Ropa</option>
            <option value="Calzado">Calzado</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Hogar">Hogar</option>
            <option value="Juguetería">Juguetería</option>
            <option value="Belleza">Belleza</option>
            <option value="Deportes">Deportes</option>
            <option value="Libros">Libros</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="descripcionProducto">Descripción:</label>
          <textarea id="descripcionProducto" rows="3" />
        </div>
        <div className="campo">
          <label htmlFor="imagenProducto">Imagen:</label>
          <input type="file" id="imagenProducto" multiple />
          <div id="previewImagenes">{/* Previsualización futura */}</div>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </section>
  );
}

function ConfiguracionEmprendedor() {
  const [mostrarPass, setMostrarPass] = useState(false);

  return (
    <section className="contenedor-configuracion">
      <h2>Configuración</h2>
      <form
        className="formulario-configuracion"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="campo">
          <label htmlFor="configNombre">Nombre:</label>
          <input type="text" id="configNombre" />
        </div>
        <div className="campo">
          <label htmlFor="configApellido">Apellido:</label>
          <input type="text" id="configApellido" />
        </div>
        <div className="campo">
          <label htmlFor="configNombreEmprendimiento">
            Nombre del Emprendimiento:
          </label>
          <input type="text" id="configNombreEmprendimiento" disabled />
        </div>
        <div className="campo">
          <label htmlFor="configCorreo">Correo electrónico:</label>
          <input type="email" id="configCorreo" disabled />
        </div>
        <div className="campo">
          <label htmlFor="configContrasena">Contraseña:</label>
          <div className="input-password">
            <input
              type={mostrarPass ? "text" : "password"}
              id="configContrasena"
              required
            />
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setMostrarPass(!mostrarPass)}
            >
              👁
            </button>
          </div>
        </div>
        <div className="campo">
          <label htmlFor="configTelefono">Teléfono:</label>
          <input type="text" id="configTelefono" />
        </div>
        <div className="campo">
          <label htmlFor="configDireccion">Dirección:</label>
          <input type="text" id="configDireccion" />
        </div>
        <div className="campo">
          <label htmlFor="configDescripcion">
            Descripción del emprendimiento:
          </label>
          <textarea id="configDescripcion" />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </section>
  );
}
