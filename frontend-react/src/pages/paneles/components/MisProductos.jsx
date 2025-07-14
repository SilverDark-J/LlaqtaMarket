import { useEffect, useState } from "react";
import { obtenerProductosEmprendedor } from "../../../services/emprendedorService";

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
    <section className="contenedor-mis-productos">
      <h2>Mis Productos</h2>
      <div className="productos-grid">
        {productos.map((producto, index) => (
          <div key={index} className="tarjeta-producto">
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
