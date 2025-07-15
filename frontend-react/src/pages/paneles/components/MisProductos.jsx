// 📁 src/pages/paneles/components/MisProductos.jsx
import { useEffect, useState } from "react";
import {
  obtenerProductosEmprendedor,
  eliminarProducto,
} from "../../../services/emprendedorService";
import styles from "../../../styles/panelEmprendedor.module.css";

export default function MisProductos({ onEditarProducto }) {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const productosObtenidos = await obtenerProductosEmprendedor();
      setProductos(productosObtenidos);
    } catch (error) {
      alert("Error al cargar productos");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (idProducto) => {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este producto?"
    );
    if (!confirmar) return;

    try {
      await eliminarProducto(idProducto);
      alert("Producto eliminado");
      cargarProductos();
    } catch (error) {
      alert("Error al eliminar producto");
      console.error(error);
    }
  };

  return (
    <section className={styles.contenedorMisProductos}>
      <h2 className={styles.tituloSeccion}>Mis Productos</h2>
      <div className={styles.productosGrid}>
        {productos.map((producto) => (
          <div key={producto.id_producto} className={styles.tarjetaProducto}>
            <img
              src={`http://localhost:3000${producto.imagen_url}`}
              alt={producto.nombre}
            />
            <h3>{producto.nombre}</h3>
            <p>Categoría: {producto.categorias || "Sin categoría"}</p>
            <p>S/ {parseFloat(producto.precio).toFixed(2)}</p>
            <div>
              <button onClick={() => onEditarProducto(producto)}>Editar</button>
              <button onClick={() => handleEliminar(producto.id_producto)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
