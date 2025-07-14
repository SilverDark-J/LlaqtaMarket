// ✅ Nuevo archivo: IndexPage.jsx actualizado con CSS modular
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/indexPage.module.css";
import logo from "../../assets/media/logo2.jpg";
import iconoPerfil from "../../assets/media/I.png";
import iconoCarrito from "../../assets/media/carrito.png";
import { obtenerProductosPublicos } from "../../services/productoService";

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
              <button onClick={() => setMostrarMenu(!mostrarMenu)} className={styles.menuBtn}>
                Menú
              </button>
              <div
                className={styles.menuOpciones}
                style={{ display: mostrarMenu ? "flex" : "none" }}
              >
                {["Ropa", "Calzado", "Electrónica", "Hogar", "Juguetería", "Belleza", "Deportes", "Libros"].map(
                  (cat, i) => (
                    <a href="#" key={i} onClick={() => filtrarPorCategoria(cat)}>
                      {cat}
                    </a>
                  )
                )}
              </div>
            </div>

            <div className={styles.buscador}>
              <input type="text" placeholder="¿Qué estás buscando?" disabled />
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

export default IndexPage;
