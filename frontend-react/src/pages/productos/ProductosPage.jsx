import React, { useState, useEffect } from "react";
import styles from "../../styles/productos.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { obtenerProductosPublicos } from "../../services/productoService";

import PublicHeader from "../../components/PublicHeader";
import PublicFooter from "../../components/PublicFooter";

const categorias = [
  "Todos",
  "Ropa",
  "Calzado",
  "Electrónica",
  "Hogar",
  "Juguetería",
  "Belleza",
  "Deportes",
  "Libros",
];

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoria = queryParams.get("categoria");
    if (categoria) setCategoriaSeleccionada(categoria);
  }, [location.search]);

  useEffect(() => {
    filtrar();
  }, [busqueda, categoriaSeleccionada]);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductosPublicos();
      setProductos(data);
      setProductosFiltrados(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const filtrar = () => {
    let filtrados = [...productos];
    if (categoriaSeleccionada !== "Todos") {
      filtrados = filtrados.filter((p) =>
        p.categorias?.includes(categoriaSeleccionada)
      );
    }
    if (busqueda.trim()) {
      filtrados = filtrados.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    setProductosFiltrados(filtrados);
  };

  return (
    <div className={styles.productosPage}>
      <PublicHeader mostrarCategorias={true} onBuscar={(valor) => setBusqueda(valor)} />

      <main className={styles.contenido}>
        <aside className={styles.categorias}>
          <h3>Categoría</h3>
          <ul>
            {categorias.map((cat) => (
              <li
                key={cat}
                className={cat === categoriaSeleccionada ? styles.activo : ""}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        <section className={styles.productos} id="productosContainer">
          {productosFiltrados.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            productosFiltrados.map((prod) => (
              <Link
                to={`/producto_detalle/${prod.id_producto}`}
                key={prod.id_producto}
              >
                <div className={styles.producto}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${prod.imagen_url}`}
                    alt={prod.nombre}
                  />
                  <h4>{prod.nombre}</h4>
                  <p>{prod.categorias?.split(",").join(" / ")}</p>
                  <strong>S/ {parseFloat(prod.precio).toFixed(2)}</strong>
                </div>
              </Link>
            ))
          )}
        </section>
      </main>

      <PublicFooter />
      
    </div>
  );
};

export default ProductosPage;
