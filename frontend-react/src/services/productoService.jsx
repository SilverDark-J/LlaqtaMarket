const API_URL = "http://localhost:3000";

export async function obtenerProductosPublicos() {
  const res = await fetch(`${API_URL}/api/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function obtenerProductoPorId(id) {
  const res = await fetch(`${API_URL}/api/productos/detalle/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}
