const BACKEND_URL = import.meta.env.VITE_API_URL;

export async function listarValoracionesPorProducto(id_producto) {
  const res = await fetch(`${BACKEND_URL}/api/valoraciones/${id_producto}`);
  if (!res.ok) {
    throw new Error("Error al obtener comentarios");
  }
  return await res.json();
}

export async function enviarValoracion({
  id_producto,
  comentario,
  puntuacion,
}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/api/valoraciones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id_producto, comentario, puntuacion }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.mensaje || "Error al enviar comentario");
  return data;
}
