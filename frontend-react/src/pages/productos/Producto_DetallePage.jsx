import React, { useEffect, useState } from "react";
import styles from "../../styles/producto_detalle.module.css";
import { useNavigate, useParams, Link } from "react-router-dom";
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
    <div className={styles.productoDetallePage}>
      <header className={styles.header}>
        <div className={styles.headerIzquierda}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Logo" className={styles.logoImg} />
            </Link>
            LlaqtaMarket
          </div>
          <div className={styles.buscador}>
            <input type="text" placeholder="¿Qué estás buscando?" />
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
      </header>

      <div className={styles.contenido}>
        <aside className={styles.categorias}>
          <h3>Categoría</h3>
          <ul>
            {["Todos", "Ropa", "Calzado", "Electrónica", "Hogar", "Juguetería", "Belleza", "Deportes", "Libros"].map((cat) => (
              <li key={cat} onClick={() => navigate(`/productos?categoria=${cat}`)}>{cat}</li>
            ))}
          </ul>
        </aside>

        <main className={styles.contenedorProducto}>
          <div className={styles.productoDetalle}>
            <img
              src={`${import.meta.env.VITE_API_URL}${producto.imagen_url}`}
              alt={producto.nombre}
              className={styles.productoImg}
            />
            <div className={styles.productoInfo}>
              <h2>{producto.nombre}</h2>
              <p><strong>Precio:</strong> S/ {parseFloat(producto.precio).toFixed(2)}</p>
              <p><strong>Categorías:</strong> {producto.categorias?.split(",").join(" / ")}</p>
              <p><strong>Descripción:</strong> {producto.descripcion}</p>
              <p><strong>Vendido por:</strong> {producto.nombre_emprendimiento}</p>
            </div>
          </div>

          <div className={styles.comentarios}>
            <h3>Valora este producto</h3>
            <div className={styles.estrellas}>
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={num <= valorEstrella ? styles.seleccionada : ""}
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

            <div className={styles.comentariosLista}>
              {comentarios.map((c, idx) => (
                <div key={idx} className={styles.comentarioUsuario}>
                  <p><strong>Usuario:</strong> {c.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

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

export default ProductoDetallePage;
