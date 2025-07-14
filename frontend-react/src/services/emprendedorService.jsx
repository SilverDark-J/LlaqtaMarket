// 📁 src/services/emprendedorService.js

const API_URL = "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

export const obtenerEmprendedor = async () => {
  const token = getToken();

  const res = await fetch(`${API_URL}/emprendedores`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("No autorizado");

  return await res.json();
};

export const actualizarEmprendedor = async (datos) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/emprendedores`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });

  if (!res.ok) throw new Error("Error al actualizar datos");
  return await res.json();
};

export const guardarProducto = async (formData) => {
  const token = getToken();
  const payload = JSON.parse(atob(token.split(".")[1]));
  const id = payload.id_emprendedor;

  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Error al guardar producto");
  return await res.json();
};

export const obtenerProductosEmprendedor = async () => {
  const token = getToken();
  const payload = JSON.parse(atob(token.split(".")[1]));
  const id = payload.id_emprendedor;

  const res = await fetch(`${API_URL}/productos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
};
