// 📁 src/pages/paneles/components/MisProductos.jsx
import { useEffect, useState } from "react";
import { obtenerProductosEmprendedor } from "../../../services/emprendedorService";
import styles from "../../../styles/panelEmprendedor.module.css";

export default function MisProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosObtenidos = await obtenerProductosEmprendedor();
        setProductos(productosObtenidos);
      } catch (error) {
        alert("Error al cargar productos");
      }
    };
    cargarProductos();
  }, []);

  return (
    <section className={styles.contenedorMisProductos}>
      <h2>Mis Productos</h2>
      <div className={styles.productosGrid}>
        {productos.map((producto, index) => (
          <div key={index} className={styles.tarjetaProducto}>
            <img
              src={`http://localhost:3000${producto.imagen_url}`}
              alt={producto.nombre}
            />
            <h3>{producto.nombre}</h3>
            <p>Categoría: {producto.categorias || "Sin categoría"}</p>
            <p>S/ {parseFloat(producto.precio).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
