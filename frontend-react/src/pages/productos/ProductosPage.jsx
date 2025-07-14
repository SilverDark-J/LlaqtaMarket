import React, { useState, useEffect } from "react";
import "../../styles/productos.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { obtenerProductosPublicos } from "../../services/productoService";
import logo from "../../assets/media/logo2.jpg";
import iconoPerfil from "../../assets/media/I.png";
import iconoCarrito from "../../assets/media/carrito.png";

const categorias = ["Todos", "Ropa", "Calzado", "Electrónica", "Hogar", "Juguetería", "Belleza", "Deportes", "Libros"];

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
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

  const [productosFiltrados, setProductosFiltrados] = useState([]);

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
      filtrados = filtrados.filter(p => p.categorias?.includes(categoriaSeleccionada));
    }
    if (busqueda.trim()) {
      filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    }
    setProductosFiltrados(filtrados);
  };

  return (
    <div className="productos-page">
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
              <button className="menu-btn">Menú</button>
            </div>

            <div className="buscador">
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
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

      <main className="contenido">
        <aside className="categorias">
          <h3>Categoría</h3>
          <ul>
            {categorias.map((cat) => (
              <li
                key={cat}
                className={cat === categoriaSeleccionada ? "activo" : ""}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        <section className="productos" id="productosContainer">
          {productosFiltrados.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            productosFiltrados.map((prod) => (
              <Link to={`/producto_detalle/${prod.id_producto}`} key={prod.id_producto}>
                <div className="producto">
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

export default ProductosPage;
