const BACKEND_URL = import.meta.env.VITE_API_URL;

export async function obtenerCarrito() {
  const res = await fetch(`${BACKEND_URL}/api/carrito`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await res.json();
}

export async function actualizarCantidad(idDetalle, cantidad) {
  await fetch(`${BACKEND_URL}/api/carrito/${idDetalle}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ cantidad }),
  });
}

export async function eliminarDelCarrito(idDetalle) {
  await fetch(`${BACKEND_URL}/api/carrito/${idDetalle}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function agregarAlCarrito(id_producto, cantidad) {
  const res = await fetch(`${BACKEND_URL}/api/carrito/agregar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id_producto, cantidad }),
  });

  if (!res.ok) throw new Error("Error al agregar al carrito");
}
