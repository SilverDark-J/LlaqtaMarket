import { useEffect, useState } from "react";
import styles from "../styles/carritoCliente.module.css";
import {
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
} from "../services/carritoService";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

export default function CarritoCliente() {
  const [carrito, setCarrito] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [idCarrito, setIdCarrito] = useState(null);

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = async () => {
    try {
      const data = await obtenerCarrito();
      const productos = (data.productos || []).map((p) => ({
        ...p,
        precio: Number(p.precio),
        subtotal: Number(p.subtotal),
      }));

      setCarrito(productos);
      setSubtotal(Number(data.total || 0));
      setIdCarrito(data.id_carrito);
    } catch (error) {
      console.error("Error al cargar carrito:", error);
      setCarrito([]);
      setSubtotal(0);
      setIdCarrito(null);
    }
  };

  const cambiarCantidad = async (idDetalle, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    await actualizarCantidad(idDetalle, nuevaCantidad);
    cargarCarrito();
  };

  const eliminarProducto = async (idProducto) => {
    if (!idCarrito) return;
    await eliminarDelCarrito(idCarrito, idProducto);
    cargarCarrito();
  };

  const handleVaciarCarrito = async () => {
    if (confirm("¿Estás seguro de vaciar tu carrito?")) {
      await vaciarCarrito();
      cargarCarrito();
    }
  };

  return (
    <>
      <PublicHeader />

      <main className={styles.carritoContainer}>
        <h2 className={styles.tituloCarrito}>🛒 Mi Carrito</h2>

        {carrito.length === 0 ? (
          <p className={styles.vacio}>Tu carrito está vacío.</p>
        ) : (
          <>
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
                        src={`${import.meta.env.VITE_API_URL}${
                          item.imagen_url
                        }`}
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
                            cambiarCantidad(
                              item.id_detallecarrito,
                              item.cantidad - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.cantidad}</span>
                        <button
                          onClick={() =>
                            cambiarCantidad(
                              item.id_detallecarrito,
                              item.cantidad + 1
                            )
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
                        onClick={() => eliminarProducto(item.id_producto)}
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
                <a
                  href="/productos"
                  className={`${styles.btn} ${styles.seguir}`}
                >
                  ← Seguir comprando
                </a>
                <a href="/pago" className={styles.btn}>
                  Continuar para pagar
                </a>{" "}
                <button
                  className={`${styles.btn} ${styles.vaciar}`}
                  onClick={handleVaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <PublicFooter />
    </>
  );
}
