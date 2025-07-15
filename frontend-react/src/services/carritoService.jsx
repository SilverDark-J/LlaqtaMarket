const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerCarrito() {
  const res = await fetch(`${API_URL}/api/carrito`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await res.json();
}

export async function actualizarCantidad(id_detallecarrito, cantidad) {
  await fetch(`${API_URL}/api/carrito/actualizar-cantidad`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id_detallecarrito, cantidad }),
  });
}

export async function eliminarDelCarrito(id_carrito, id_producto) {
  await fetch(`${API_URL}/api/carrito/${id_carrito}/${id_producto}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function agregarAlCarrito(id_producto, cantidad) {
  const res = await fetch(`${API_URL}/api/carrito/agregar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id_producto, cantidad }),
  });

  if (!res.ok) throw new Error("Error al agregar al carrito");
}

export async function vaciarCarrito() {
  await fetch(`${API_URL}/api/carrito/vaciar`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
