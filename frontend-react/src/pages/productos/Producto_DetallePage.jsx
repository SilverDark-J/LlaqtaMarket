// src/pages/productos/Producto_DetallePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/producto_detalle.module.css";
import { obtenerProductoPorId } from "../../services/productoService";
import { agregarAlCarrito } from "../../services/carritoService";
import {
  listarValoracionesPorProducto,
  enviarValoracion,
} from "../../services/valoracionService";
import { verificarPermisoComentario } from "../../services/permisoComentarioService";
import { obtenerRolDesdeToken, obtenerToken } from "../../utils/authUtils";
import PublicLayout from "../../layouts/PublicLayout";

const ProductoDetallePage = () => {
  const [producto, setProducto] = useState(null);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [valorEstrella, setValorEstrella] = useState(0);
  const [puedeComentar, setPuedeComentar] = useState(false);
  const [cantidad, setCantidad] = useState(1);
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

    const cargarComentarios = async () => {
      try {
        const data = await listarValoracionesPorProducto(id);
        setComentarios(data);
      } catch (error) {
        console.error(error);
      }
    };

    const validarPermiso = async () => {
      const permitido = await verificarPermisoComentario(id);
      setPuedeComentar(permitido);
    };

    cargarProducto();
    cargarComentarios();
    validarPermiso();
  }, [id]);

  const handleEnviarComentario = async () => {
    if (!obtenerToken())
      return alert("Debes iniciar sesión como cliente para comentar.");
    if (comentario.trim() === "")
      return alert("Por favor escribe un comentario.");
    if (valorEstrella === 0) return alert("Selecciona una puntuación.");

    try {
      await enviarValoracion({
        id_producto: id,
        comentario,
        puntuacion: valorEstrella,
      });
      alert("¡Gracias por tu valoración!");
      setComentario("");
      setValorEstrella(0);
      const nuevosComentarios = await listarValoracionesPorProducto(id);
      setComentarios(nuevosComentarios);
      setPuedeComentar(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAgregarAlCarrito = async () => {
    const rol = obtenerRolDesdeToken();
    if (rol !== "cliente")
      return alert(
        "Debes iniciar sesión como cliente para agregar al carrito."
      );

    try {
      await agregarAlCarrito(producto.id_producto, cantidad);
      alert("✅ Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("❌ No se pudo agregar al carrito.");
    }
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <PublicLayout>
      <div className={styles.contenido}>
        <aside className={styles.categorias}>
          <h3>Categoría</h3>
          <ul>
            {[
              "Todos",
              "Ropa",
              "Calzado",
              "Electrónica",
              "Hogar",
              "Juguetería",
              "Belleza",
              "Deportes",
              "Libros",
            ].map((cat) => (
              <li
                key={cat}
                onClick={() => navigate(`/productos?categoria=${cat}`)}
              >
                {cat}
              </li>
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
              <p>
                <strong>Precio:</strong> S/{" "}
                {parseFloat(producto.precio).toFixed(2)}
              </p>
              <p>
                <strong>Categorías:</strong>{" "}
                {producto.categorias?.split(",").join(" / ")}
              </p>
              <p>
                <strong>Descripción:</strong> {producto.descripcion}
              </p>
              <p>
                <strong>Vendido por:</strong> {producto.nombre_emprendimiento}
              </p>

              <div className={styles.cantidadAgregar}>
                <label>Cantidad:</label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) =>
                    setCantidad(Math.max(1, parseInt(e.target.value)))
                  }
                  min={1}
                />
                <button onClick={handleAgregarAlCarrito}>
                  🛒 Agregar al carrito
                </button>
              </div>
            </div>
          </div>

          <div className={styles.comentarios}>
            <h3>Valoraciones y comentarios</h3>

            {puedeComentar && (
              <div className={styles.formularioComentario}>
                <div className={styles.estrellas}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span
                      key={num}
                      className={
                        num <= valorEstrella ? styles.seleccionada : ""
                      }
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
                <button onClick={handleEnviarComentario}>
                  Enviar comentario
                </button>
              </div>
            )}

            <div className={styles.comentariosLista}>
              {comentarios.length === 0 ? (
                <p>No hay comentarios aún.</p>
              ) : (
                comentarios.map((c, idx) => (
                  <div key={idx} className={styles.comentarioUsuario}>
                    <strong>{c.nombre_cliente}</strong>
                    <p>{"★".repeat(c.puntuacion)}</p>
                    <p>{c.comentario}</p>
                    <small>
                      {new Date(c.fecha_comentario).toLocaleDateString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </PublicLayout>
  );
};

export default ProductoDetallePage;
