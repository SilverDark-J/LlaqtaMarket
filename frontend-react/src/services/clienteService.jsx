// 📁 src/services/clienteService.js
export async function obtenerCliente() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/clientes", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información del cliente");
  }

  return response.json();
}

export async function actualizarCliente(datos) {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/clientes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar los datos del cliente");
  }

  return response.json();
}
