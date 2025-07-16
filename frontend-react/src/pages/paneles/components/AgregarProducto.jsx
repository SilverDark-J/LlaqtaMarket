// 📁 src/pages/paneles/components/AgregarProducto.jsx
import { useState, useEffect } from "react";
import {
  guardarProducto,
  actualizarProducto,
} from "../../../services/emprendedorService";
import styles from "../../../styles/panelEmprendedor.module.css";

export default function AgregarProducto({ productoEditar = null, onGuardado }) {
  const [datos, setDatos] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    descripcion: "",
  });
  const [imagen, setImagen] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!imagen) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imagen);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imagen]);

  useEffect(() => {
    if (productoEditar) {
      setDatos({
        nombre: productoEditar.nombre || "",
        precio: productoEditar.precio || "",
        categoria: productoEditar.categorias || "",
        descripcion: productoEditar.descripcion || "",
      });
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(datos).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (imagen) formData.append("imagenProducto", imagen);

      if (productoEditar) {
        await actualizarProducto(productoEditar.id_producto, formData);
        alert("Producto actualizado correctamente");
      } else {
        if (!imagen) return alert("Selecciona una imagen");
        await guardarProducto(formData);
        alert("Producto guardado correctamente");
      }

      setDatos({ nombre: "", precio: "", categoria: "", descripcion: "" });
      setImagen(null);
      onGuardado?.(); // recargar productos si se pasa callback
    } catch (error) {
      alert("Error al guardar producto");
      console.error(error);
    }
  };

  return (
    <section className={styles.contenedorAgregarProducto}>
      <h2>{productoEditar ? "Editar Producto" : "Agregar Producto"}</h2>
      <form className={styles.formularioAgregar} onSubmit={handleSubmit}>
        <div className={styles.campo}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.campo}>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={datos.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.campo}>
          <label>Categoría:</label>
          <select
            name="categoria"
            value={datos.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Ropa">Ropa</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Libros">Libros</option>
          </select>
        </div>
        <div className={styles.campo}>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className={styles.campo}>
          <label>Imagen:</label>
          <input type="file" onChange={handleImagenChange} />

          {/* Vista previa si estás editando pero aún no has subido otra imagen */}
          {productoEditar?.imagen_url && !imagen && (
            <div className={styles.previewImagenes}>
              <img
                src={`http://localhost:3000${productoEditar.imagen_url}`}
                alt="Imagen actual"
              />
            </div>
          )}

          {/* Vista previa de la nueva imagen seleccionada (agregar o editar) */}
          {previewUrl && (
            <div className={styles.previewImagenes}>
              <img src={previewUrl} alt="Vista previa" />
            </div>
          )}
        </div>

        <button type="submit">
          {productoEditar ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </section>
  );
}
