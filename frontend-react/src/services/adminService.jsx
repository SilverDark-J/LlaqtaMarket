const API_URL = "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Obtener todos los clientes
export const obtenerClientes = async () => {
  const res = await fetch(`${API_URL}/clientes/todos`, {
    headers: getHeaders(),
  });
  return await res.json();
};

// Obtener todos los emprendedores
export const obtenerEmprendedores = async () => {
  const res = await fetch(`${API_URL}/emprendedores/todos`, {
    headers: getHeaders(),
  });
  return await res.json();
};

// Bloquear usuario (cliente o emprendedor)
export const bloquearUsuario = async (id_usuario) => {
  const res = await fetch(`${API_URL}/usuarios/${id_usuario}/estado`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ nuevo_estado: "bloqueado" }),
  });
  return await res.json();
};

// Obtener un cliente por ID (opcional si quieres precargar antes del modal)
export const obtenerClientePorId = async (id_cliente) => {
  const res = await fetch(`${API_URL}/clientes/admin/${id_cliente}`, {
    headers: getHeaders(),
  });
  return await res.json();
};

// Obtener un emprendedor por ID (opcional si lo necesitas)
export const obtenerEmprendedorPorId = async (id_emprendedor) => {
  const res = await fetch(`${API_URL}/emprendedores/admin/${id_emprendedor}`, {
    headers: getHeaders(),
  });
  return await res.json();
};

// Actualizar datos del cliente
export const actualizarCliente = async (cliente) => {
  const res = await fetch(`${API_URL}/clientes/admin/${cliente.id_cliente}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(cliente),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al actualizar cliente");
  }

  return await res.json();
};

// Actualizar datos del emprendedor
export const actualizarEmprendedor = async (emprendedor) => {
  const res = await fetch(
    `${API_URL}/emprendedores/admin/${emprendedor.id_emprendedor}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(emprendedor),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al actualizar emprendedor");
  }

  return await res.json();
};
