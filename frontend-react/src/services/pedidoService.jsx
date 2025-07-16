// ✅ src/services/pedidoService.jsx
const BACKEND_URL = import.meta.env.VITE_API_URL;

export async function realizarPedido(datos) {
  const res = await fetch(`${BACKEND_URL}/api/pedidos/pagar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(datos),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al procesar el pago");
  }

  return await res.json();
}
