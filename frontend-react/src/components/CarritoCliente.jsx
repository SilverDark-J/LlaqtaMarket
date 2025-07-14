// ✅ CarritoCliente.jsx
import { useEffect, useState } from "react";
import styles from "../styles/carritoCliente.module.css";
import {
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
} from "../services/carritoService";

// Importamos PublicHeader desde la misma carpeta
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

export default function CarritoCliente() {
  const [carrito, setCarrito] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = async () => {
    try {
      const data = await obtenerCarrito();
      console.log("🚀 Respuesta del carrito:", data);

      // Convertimos precio y subtotal a número por seguridad
      const productos = (data.productos || []).map((p) => ({
        ...p,
        precio: Number(p.precio),
        subtotal: Number(p.subtotal),
      }));

      setCarrito(productos);
      setSubtotal(Number(data.total || 0));
    } catch (error) {
      console.error("Error al cargar carrito:", error);
      setCarrito([]);
      setSubtotal(0);
    }
  };

  const cambiarCantidad = async (idDetalle, cantidad) => {
    await actualizarCantidad(idDetalle, cantidad);
    cargarCarrito();
  };

  const eliminarProducto = async (idDetalle) => {
    await eliminarDelCarrito(idDetalle);
    cargarCarrito();
  };

  return (
    <main className={styles.carritoContainer}>
      {/* Aquí puedes incluir el componente PublicHeader */}
      <PublicHeader />

      <h2 className={styles.tituloCarrito}>🛒 Mi Carrito</h2>

      <table className={styles.tablaCarrito}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id_detallecarrito}>
              <td data-label="Producto">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${item.imagen_url}`}
                  alt={item.nombre}
                />
                <br />
                {item.nombre}
              </td>
              <td data-label="Precio">S/ {item.precio.toFixed(2)}</td>
              <td data-label="Cantidad">
                <div className={styles.cantidadControl}>
                  <button
                    onClick={() =>
                      cambiarCantidad(item.id_detallecarrito, item.cantidad - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    onClick={() =>
                      cambiarCantidad(item.id_detallecarrito, item.cantidad + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </td>
              <td data-label="Subtotal">S/ {item.subtotal.toFixed(2)}</td>
              <td>
                <button
                  className={styles.eliminarBtn}
                  onClick={() => eliminarProducto(item.id_detallecarrito)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.resumenCarrito}>
        <p>
          <strong>Subtotal:</strong> S/ {subtotal.toFixed(2)}
        </p>
        <div className={styles.botones}>
          <a href="/productos" className={`${styles.btn} ${styles.seguir}`}>
            ← Seguir comprando
          </a>
          <button className={styles.btn}>Continuar para pagar</button>
        </div>
      </div>

      <PublicFooter />
    </main>
  );
}
