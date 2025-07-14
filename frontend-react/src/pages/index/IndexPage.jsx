import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/styles.css";
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
      setProductos(data.slice(0, 8)); // Mostrar solo los 8 primeros como recomendados
    } catch (error) {
      console.error("Error al obtener productos recomendados:", error);
    }
  };

  const filtrarPorCategoria = (categoria) => {
    navigate(`/productos?categoria=${encodeURIComponent(categoria)}`);
  };

  return (
    <div>
      <header className="header">
        <div className="header-contenido">
          <div className="header-izquierda">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Logo" className="logo-img" />
              </Link>
              LlaqtaMarket
            </div>

            <div className="menu-container">
              <button onClick={() => setMostrarMenu(!mostrarMenu)} className="menu-btn">
                Menú
              </button>
              <div
                className="menu-opciones"
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

            <div className="buscador">
              <input type="text" placeholder="¿Qué estás buscando?" disabled />
            </div>
          </div>

          <div className="acciones">
            <Link to="/login" className="perfil">
              <img src={iconoPerfil} alt="Perfil" className="icono" />
              <p>Iniciar Sesión</p>
            </Link>
            <Link to="/productos" className="carrito">
              <img src={iconoCarrito} alt="Carrito" className="icono" />
              <p>Carrito</p>
            </Link>
          </div>
        </div>
      </header>

      <main className="productos-recomendados">
        <h2>Productos Recomendados</h2>
        <div className="grid-productos">
          {productos.map((producto) => (
            <Link key={producto.id_producto} to={`/producto_detalle/${producto.id_producto}`}>
              <div className="producto">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${producto.imagen_url}`}
                  alt={producto.nombre}
                />
                <h3>{producto.nombre}</h3>
                <p className="categoria">{producto.categorias?.split(",").join(" / ")}</p>
                <p className="precio">S/ {parseFloat(producto.precio).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">Acerca de nosotros</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">Redes Sociales</a>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
