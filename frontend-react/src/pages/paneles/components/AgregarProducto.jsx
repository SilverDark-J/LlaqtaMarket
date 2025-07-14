// 📁 src/pages/paneles/components/AgregarProducto.jsx
import { useState } from "react";
import { guardarProducto } from "../../../services/emprendedorService";
import styles from "../../../styles/panelEmprendedor.module.css";

export default function AgregarProducto() {
  const [datos, setDatos] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    descripcion: "",
  });
  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen) return alert("Selecciona una imagen");

    const formData = new FormData();
    Object.entries(datos).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("imagenProducto", imagen);

    try {
      await guardarProducto(formData);
      alert("Producto guardado");
      setDatos({ nombre: "", precio: "", categoria: "", descripcion: "" });
      setImagen(null);
    } catch (error) {
      alert("Error al guardar producto");
    }
  };

  return (
    <section className={styles.contenedorAgregarProducto}>
      <h2>Agregar Producto</h2>
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
        </div>
        <button type="submit">Guardar</button>
      </form>
    </section>
  );
}
