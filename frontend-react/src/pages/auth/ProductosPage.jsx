import React, { useState, useEffect } from "react";
import "../../styles/productos.css";
import { Link } from "react-router-dom";

import logo from "../../assets/media/logo2.jpg";
import iconoPerfil from "../../assets/media/I.png";
import iconoCarrito from "../../assets/media/carrito.png";
import { useNavigate } from "react-router-dom";
import zapatillas from "../../assets/productos/zapatillas_urbanas.png";
import polera from "../../assets/productos/polera_casual.jpg";
import auriculares from "../../assets/productos/auriculares.png";
import gorro from "../../assets/productos/gorro_lana.jpg";
import smartwatch from "../../assets/productos/smartwatch.jpg";
import mochila from "../../assets/productos/mochila_escolar.jpg";
import sandalias from "../../assets/productos/sandalias_verano.jpg";
import camisa from "../../assets/productos/camisa_formal.jpg";
import mouse from "../../assets/productos/mouse_inhalambrico.jpg";
import cargador from "../../assets/productos/cargador_rapido.jpg";
import olla from "../../assets/productos/olla_arrocera.jpg";
import muneca from "../../assets/productos/muneca_bebe.jpg";
import maquillaje from "../../assets/productos/maquillaje_facial.jpg";
import balon from "../../assets/productos/balon_futbol.jpg";
import libro from "../../assets/productos/libro_cocina.jpg";

const listaProductos = [
  { nombre: "Zapatillas Urbanas", categoria: "Calzado", imagen: zapatillas, precio: 120 },
  { nombre: "Polera Casual", categoria: "Ropa", imagen: polera, precio: 85 },
  { nombre: "Auriculares Bluetooth", categoria: "Electrónica", imagen: auriculares, precio: 150 },
  { nombre: "Gorro de Lana", categoria: "Ropa", imagen: gorro, precio: 25 },
  { nombre: "Smartwatch Fit", categoria: "Electrónica", imagen: smartwatch, precio: 210 },
  { nombre: "Mochila Escolar", categoria: "Ropa", imagen: mochila, precio: 65 },
  { nombre: "Sandalias Verano", categoria: "Calzado", imagen: sandalias, precio: 35 },
  { nombre: "Camisa Formal", categoria: "Ropa", imagen: camisa, precio: 95 },
  { nombre: "Mouse Inalámbrico", categoria: "Electrónica", imagen: mouse, precio: 45 },
  { nombre: "Cargador Rápido", categoria: "Electrónica", imagen: cargador, precio: 60 },
  { nombre: "Olla Arrocera", categoria: "Hogar", imagen: olla, precio: 180 },
  { nombre: "Muñeca Bebé", categoria: "Juguetería", imagen: muneca, precio: 70 },
  { nombre: "Maquillaje Facial", categoria: "Belleza", imagen: maquillaje, precio: 50 },
  { nombre: "Balón de Fútbol", categoria: "Deportes", imagen: balon, precio: 70 },
  { nombre: "Libro de Cocina", categoria: "Libros", imagen: libro, precio: 40 },
];


const categorias = ["Todos", "Ropa", "Calzado", "Electrónica", "Hogar", "Juguetería", "Belleza", "Deportes", "Libros"];

const ProductosPage = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [productos, setProductos] = useState(listaProductos);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const navigate = useNavigate();

  useEffect(() => {
    filtrar();
  }, [busqueda, categoriaSeleccionada]);

  const filtrar = () => {
    let filtrados = listaProductos;

    if (categoriaSeleccionada !== "Todos") {
      filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
    }

    if (busqueda.trim()) {
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setProductos(filtrados);
  };

  const seleccionarProducto = (producto) => {
    localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
    navigate("/producto_detalle");
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
          {productos.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            productos.map((prod, index) => (
              <div className="producto" key={index} onClick={() => seleccionarProducto(prod)}>
                <img src={prod.imagen} alt={prod.nombre} />
                <h4>{prod.nombre}</h4>
                <p>{prod.categoria}</p>
                <strong>S/ {prod.precio.toFixed(2)}</strong>
              </div>
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
