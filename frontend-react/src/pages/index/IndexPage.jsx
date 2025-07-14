import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.css";
import logo from "../../assets/media/logo2.jpg";
import iconoPerfil from "../../assets/media/I.png";
import iconoCarrito from "../../assets/media/carrito.png";

// Cargar productos desde el array
import zapatillas from "../../assets/productos/zapatillas_urbanas.png";
import polera from "../../assets/productos/polera_casual.jpg";
import auriculares from "../../assets/productos/auriculares.png";
import gorro from "../../assets/productos/gorro_lana.jpg";
import smartwatch from "../../assets/productos/smartwatch.jpg";
import mochila from "../../assets/productos/mochila_escolar.jpg";
import sandalias from "../../assets/productos/sandalias_verano.jpg";
import camisa from "../../assets/productos/camisa_formal.jpg";
import mouse from "../../assets/productos/mouse_inhalambrico.jpg";
import polo from "../../assets/productos/polo_basico.jpg";
import cargador from "../../assets/productos/cargador_rapido.jpg";
import zapatos from "../../assets/productos/zapatos_cuero.jpg";

const productos = [
  { nombre: "Zapatillas Urbanas", categoria: "Calzado", precio: "S/ 120.00", imagen: zapatillas },
  { nombre: "Polera Casual", categoria: "Ropa", precio: "S/ 85.00", imagen: polera },
  { nombre: "Auriculares Bluetooth", categoria: "Electrónica", precio: "S/ 150.00", imagen: auriculares },
  { nombre: "Gorro de Lana", categoria: "Ropa", precio: "S/ 25.00", imagen: gorro },
  { nombre: "Smartwatch Fit", categoria: "Electrónica", precio: "S/ 210.00", imagen: smartwatch },
  { nombre: "Mochila Escolar", categoria: "Ropa", precio: "S/ 65.00", imagen: mochila },
  { nombre: "Sandalias Verano", categoria: "Calzado", precio: "S/ 35.00", imagen: sandalias },
  { nombre: "Camisa Formal", categoria: "Ropa", precio: "S/ 95.00", imagen: camisa },
  { nombre: "Mouse Inalámbrico", categoria: "Electrónica", precio: "S/ 45.00", imagen: mouse },
  { nombre: "Polo Básico", categoria: "Ropa", precio: "S/ 30.00", imagen: polo },
  { nombre: "Cargador Rápido", categoria: "Electrónica", precio: "S/ 60.00", imagen: cargador },
  { nombre: "Zapatos de Cuero", categoria: "Calzado", precio: "S/ 180.00", imagen: zapatos },
];

const IndexPage = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const filtrarPorCategoria = (categoria) => {
    alert(`Filtrando por: ${categoria}`);
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
                {[
                  "Ropa", "Calzado", "Electrónica", "Hogar",
                  "Juguetería", "Belleza", "Deportes", "Libros",
                ].map((cat, i) => (
                  <a href="#" key={i} onClick={() => filtrarPorCategoria(cat)}>
                    {cat}
                  </a>
                ))}
              </div>
            </div>

            <div className="buscador">
              <input type="text" placeholder="¿Qué estás buscando?" />
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
          {productos.map((producto, i) => (
            <Link key={i} to="/producto_detalle">
              <div className="producto">
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p className="categoria">{producto.categoria}</p>
                <p className="precio">{producto.precio}</p>
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