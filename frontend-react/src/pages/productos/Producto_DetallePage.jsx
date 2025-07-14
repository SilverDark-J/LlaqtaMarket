import React, { useEffect, useState } from "react";
import "../../styles/producto_detalle.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/media/logo2.jpg";
import iconoPerfil from "../../assets/media/I.png";
import iconoCarrito from "../../assets/media/carrito.png";
import { obtenerProductoPorId } from "../../services/productoService";

const ProductoDetallePage = () => {
  const [producto, setProducto] = useState(null);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [valorEstrella, setValorEstrella] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await obtenerProductoPorId(id);
        setProducto(data);
      } catch (error) {
        console.error(error);
        navigate("/productos");
      }
    };
    cargarProducto();
  }, [id]);

  const enviarComentario = () => {
    if (comentario.trim() === "") return alert("Por favor escribe un comentario.");
    setComentarios([...comentarios, { texto: comentario, estrellas: valorEstrella }]);
    setComentario("");
    setValorEstrella(0);
  };

  if (!producto) return <p>Cargando...</p>;

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
              <li key={cat} onClick={() => navigate(`/productos?categoria=${cat}`)}>{cat}</li>
            ))}
          </ul>
        </aside>

        <main id="contenedor-producto">
          <div className="producto-detalle">
            <img
              src={`${import.meta.env.VITE_API_URL}${producto.imagen_url}`}
              alt={producto.nombre}
              className="producto-img"
            />
            <div className="producto-info">
              <h2>{producto.nombre}</h2>
              <p><strong>Precio:</strong> S/ {parseFloat(producto.precio).toFixed(2)}</p>
              <p><strong>Categorías:</strong> {producto.categorias?.split(",").join(" / ")}</p>
              <p><strong>Descripción:</strong> {producto.descripcion}</p>
              <p><strong>Vendido por:</strong> {producto.nombre_emprendimiento}</p>
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
            <button onClick={enviarComentario}>Enviar</button>

            <div className="comentarios-lista">
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
