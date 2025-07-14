import { useState, useEffect } from "react";
import styles from "../../styles/carritoCliente.module.css";
import { Link } from "react-router-dom";

const productosIniciales = [
  {
    id: "tv",
    nombre: "Televisor HISENSE QLED 65''",
    precio: 1499.0,
    cantidad: 1,
    imagen: "/src/assets/media/TV.png",
  },
  {
    id: "bidon",
    nombre: "Botella Bidón VIVA HOME 2L",
    precio: 6.9,
    cantidad: 1,
    imagen: "/src/assets/media/bidon.jpg",
  },
];

export default function CarritoCliente() {
  const [productos, setProductos] = useState(productosIniciales);

  const cambiarCantidad = (id, cambio) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: Math.max(1, p.cantidad + cambio) } : p
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const cantidadTotal = productos.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <div className={styles.carritoContainer}>
      <h2 className={styles.tituloCarrito}>🛒 Mi Carrito</h2>

      <div className={styles.contadorProductos}>
        Productos seleccionados: <span>{cantidadTotal}</span>
      </div>

      <table className={styles.tablaCarrito}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td data-label="Producto">
                <img src={producto.imagen} alt={producto.nombre} />
                <br />
                {producto.nombre}
              </td>
              <td data-label="Precio">S/ {producto.precio.toFixed(2)}</td>
              <td data-label="Cantidad">
                <div className={styles.cantidadControl}>
                  <button onClick={() => cambiarCantidad(producto.id, -1)}>
                    −
                  </button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => cambiarCantidad(producto.id, 1)}>
                    +
                  </button>
                </div>
              </td>
              <td data-label="Total">
                S/ {(producto.precio * producto.cantidad).toFixed(2)}
              </td>
              <td data-label="Acción">
                <button
                  className={styles.eliminarBtn}
                  onClick={() => eliminarProducto(producto.id)}
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
          <Link to="/productos" className={`${styles.btn} ${styles.seguir}`}>
            ← Seguir comprando
          </Link>
          <button className={styles.btn}>Continuar para pagar</button>
        </div>
      </div>
    </div>
  );
}
