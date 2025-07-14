// ✅ Nuevo archivo: IndexPage.jsx actualizado con CSS modular
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/indexPage.module.css";
import { obtenerProductosPublicos } from "../../services/productoService";

import PublicHeader from "../../components/PublicHeader";
import PublicFooter from "../../components/PublicFooter";

const IndexPage = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const data = await obtenerProductosPublicos();
      setProductos(data.slice(0, 8)); // Mostrar solo los 8 primeros
    } catch (error) {
      console.error("Error al obtener productos recomendados:", error);
    }
  };

  const filtrarPorCategoria = (categoria) => {
    navigate(`/productos?categoria=${encodeURIComponent(categoria)}`);
  };

  return (
    <div>
      <PublicHeader mostrarCategorias={true} />

      <main className={styles.productosRecomendados}>
        <h2>Productos Recomendados</h2>
        <div className={styles.gridProductos}>
          {productos.map((producto) => (
            <Link key={producto.id_producto} to={`/producto_detalle/${producto.id_producto}`}>
              <div className={styles.producto}>
                <img
                  src={`${import.meta.env.VITE_API_URL}${producto.imagen_url}`}
                  alt={producto.nombre}
                />
                <h3>{producto.nombre}</h3>
                <p className={styles.categoria}>{producto.categorias?.split(",").join(" / ")}</p>
                <p className={styles.precio}>S/ {parseFloat(producto.precio).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default IndexPage;
