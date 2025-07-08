import React, { useEffect, useState } from "react";
import "../../styles/producto_detalle.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/media/logo2.jpg";
import iconoPerfil from "../../assets/media/I.png";
import iconoCarrito from "../../assets/media/carrito.png";

const ProductoDetallePage = () => {
  const [producto, setProducto] = useState(null);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [valorEstrella, setValorEstrella] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const seleccionado = localStorage.getItem("productoSeleccionado");
    if (seleccionado) {
      setProducto(JSON.parse(seleccionado));
    } else {
      navigate("/productos");
    }
  }, []);

  const enviarComentario = () => {
    if (comentario.trim() === "") return alert("Por favor escribe un comentario.");
    setComentarios([...comentarios, { texto: comentario, estrellas: valorEstrella }]);
    setComentario("");
    setValorEstrella(0);
  };

  if (!producto) return null;

  return (
    <div className="producto-detalle-page">
      <header className="header">
        <div className="header-izquierda">
          <div className="logo">
            <Link to="/">
                <img src={logo} alt="Logo" className="logo-img" />
            </Link>
            LlaqtaMarket
          </div>
          <div className="menu-container">
            <button className="menu-btn">Menú</button>
            <div className="menu-opciones" id="menuOpciones">
              {/* Opcional: puedes enlazar a rutas */}
              {[
                "Ropa", "Calzado", "Electrónica", "Hogar", "Juguetería", "Belleza", "Deportes", "Libros"
              ].map((cat) => (
                <a key={cat} href="/productos">{cat}</a>
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
      </header>

      <div className="contenido">
        <aside className="categorias">
          <h3>Categoría</h3>
          <ul>
            {["Todos", "Ropa", "Calzado", "Electrónica", "Hogar", "Juguetería", "Belleza", "Deportes", "Libros"].map((cat) => (
              <li key={cat} onClick={() => navigate("/productos")}>{cat}</li>
            ))}
          </ul>
        </aside>

        <main id="contenedor-producto">
          <div className="producto-detalle">
            <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
            <div className="producto-info">
              <h2 className="producto-nombre">{producto.nombre}</h2>
              {producto.precioRegular && (
                <p><strong>Precio Regular:</strong> <del>S/ {producto.precioRegular.toFixed(2)}</del></p>
              )}
              <p><strong>Precio Online:</strong> <span className="precio-oferta">S/ {producto.precioOferta?.toFixed(2) || producto.precio.toFixed(2)}</span></p>
              {producto.color && <p><strong>Color:</strong> {producto.color}</p>}
              {producto.modelo && <p><strong>Modelo:</strong> {producto.modelo}</p>}
              {producto.cierre && <p><strong>Cierre:</strong> {producto.cierre}</p>}
              {producto.material && <p><strong>Material:</strong> {producto.material}</p>}
              {producto.coleccion && <p><strong>Colección:</strong> {producto.coleccion}</p>}
              {producto.tipo && <p><strong>Tipo:</strong> {producto.tipo}</p>}
              {producto.cuidados && <p className="cuidados"><strong>Cuidados:</strong> {producto.cuidados}</p>}
            </div>
          </div>

          <div className="comentarios">
            <h3>Valora este producto</h3>
            <div className="estrellas">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={num <= valorEstrella ? "seleccionada" : ""}
                  onClick={() => setValorEstrella(num)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Escribe tu comentario..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            ></textarea>
            <button className="enviar-comentario" onClick={enviarComentario}>Enviar</button>

            <div id="comentarios-lista">
              {comentarios.map((c, idx) => (
                <div key={idx} className="comentario-usuario">
                  <p><strong>Usuario:</strong> {c.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

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

export default ProductoDetallePage;
