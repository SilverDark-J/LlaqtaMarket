const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerMasVendidos(token) {
  const res = await fetch(`${API_URL}/api/reportes/mas-vendidos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener productos más vendidos");
  return res.json();
}

export async function obtenerSinVentas(token) {
  const res = await fetch(`${API_URL}/api/reportes/sin-ventas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener productos sin ventas");
  return res.json();
}

export async function obtenerTotalGenerado(token) {
  const res = await fetch(`${API_URL}/api/reportes/total-generado`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener total generado");
  return res.json();
}

export async function obtenerCantidadPedidos(token) {
  const res = await fetch(`${API_URL}/api/reportes/pedidos-con-productos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener cantidad de pedidos");
  return res.json();
}

export async function obtenerVentasPorMes(token) {
  const res = await fetch(`${API_URL}/api/reportes/ventas-por-mes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener ventas por mes");
  return res.json();
}
