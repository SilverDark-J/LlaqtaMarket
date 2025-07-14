import React, { useState, useEffect } from "react";
import styles from "../../styles/productos.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { obtenerProductosPublicos } from "../../services/productoService";
import logo from "../../assets/media/logo2.jpg";
import iconoPerfil from "../../assets/media/I.png";
import iconoCarrito from "../../assets/media/carrito.png";

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
      <header className={styles.header}>
        <div className={styles.headerContenido}>
          <div className={styles.headerIzquierda}>
            <div className={styles.logo}>
              <Link to="/">
                <img src={logo} alt="Logo" className={styles.logoImg} />
              </Link>
              LlaqtaMarket
            </div>

            <div className={styles.menuContainer}>
              <button className={styles.menuBtn}>Menú</button>
            </div>

            <div className={styles.buscador}>
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.acciones}>
            <Link to="/login" className={styles.perfil}>
              <img src={iconoPerfil} alt="Perfil" className={styles.icono} />
              <p>Iniciar Sesión</p>
            </Link>
            <Link to="/productos" className={styles.carrito}>
              <img src={iconoCarrito} alt="Carrito" className={styles.icono} />
              <p>Carrito</p>
            </Link>
          </div>
        </div>
      </header>

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

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#">Acerca de nosotros</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">Redes Sociales</a>
        </div>
      </footer>
    </div>
  );
};

export default ProductosPage;
