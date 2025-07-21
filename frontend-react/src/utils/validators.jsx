// src/utils/validators.jsx

export const validarCorreo = (correo) => {
  const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!correo.trim()) return "El correo es obligatorio.";
  if (!regexCorreo.test(correo)) return "Correo inválido.";
  return "";
};

export const validarContrasenia = (contrasenia) => {
  const regexContrasena =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
  if (!contrasenia.trim()) return "La contraseña es obligatoria.";
  if (!regexContrasena.test(contrasenia))
    return "Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (.,_-).";
  return "";
};

export const validarCampo = (campo, valor) => {
  switch (campo) {
    case "correo":
      return validarCorreo(valor);
    case "contrasenia":
      return validarContrasenia(valor);
    default:
      return "";
  }
};
