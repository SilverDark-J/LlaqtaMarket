const BACKEND_URL = import.meta.env.VITE_API_URL;

export async function verificarPermisoComentario(id_producto) {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const res = await fetch(
    `${BACKEND_URL}/api/pedidos/permite-comentario/${id_producto}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) return false;

  const data = await res.json();
  return data.permitido;
}
