// ✅ Extraer el rol del token
export function obtenerRolDesdeToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.tipo_usuario || null;
  } catch (e) {
    return null;
  }
}
