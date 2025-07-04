const form = document.getElementById("formRegistro");

const campos = ["nombres", "apellidos", "correo", "contrasenia"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const valido = validarFormularioCompleto();
  if (!valido) {
    alert("Corrige los errores antes de continuar.");
    return;
  }

  const datos = {
    nombres: document.getElementById("nombres").value.trim(),
    apellidos: document.getElementById("apellidos").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    contrasenia: document.getElementById("contrasenia").value,
    tipo_usuario: "cliente",
  };

  try {
    const response = await fetch("http://localhost:3000/api/usuarios/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    const resultado = await response.json();

    if (response.ok) {
      alert("✅ Registro exitoso. ¡Bienvenido!");
      window.location.href = "login.html";
    } else {
      alert("❌ " + (resultado.mensaje || "Error al registrar."));
    }
  } catch (error) {
    alert("❌ Error de conexión con el servidor.");
    console.error(error);
  }
});

// Validación de formulario completo
function validarFormularioCompleto() {
  let esValido = true;
  campos.forEach((campo) => {
    const valido = validarCampo(campo);
    if (!valido) esValido = false;
  });
  return esValido;
}

// Validación individual
function validarCampo(id) {
  const valor = document.getElementById(id).value.trim();
  const error = document.getElementById("error-" + id);
  const input = document.getElementById(id);
  let mensaje = "";

  if (id === "nombres" || id === "apellidos") {
    if (valor.length < 3) mensaje = "Debe tener al menos 3 caracteres.";
  }

  if (id === "correo") {
    const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!regexCorreo.test(valor)) mensaje = "Correo inválido.";
  }

  if (id === "contrasenia") {
    const regexContrasenia =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
    if (!regexContrasenia.test(valor)) {
      mensaje =
        "Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (.,_-).";
    }
  }

  if (mensaje) {
    error.textContent = mensaje;
    input.classList.add("input-error");
    input.classList.remove("input-ok");
    return false;
  } else {
    error.textContent = "";
    input.classList.remove("input-error");
    input.classList.add("input-ok");
    return true;
  }
}

// Eventos en vivo: blur e input
campos.forEach((campo) => {
  const input = document.getElementById(campo);
  input.addEventListener("blur", () => validarCampo(campo));
  input.addEventListener("input", () => validarCampo(campo));
});

// Mostrar/ocultar contraseña
function togglePassword() {
  const passwordInput = document.getElementById("contrasenia");
  const toggleIcon = document.getElementById("toggleIcon");

  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  toggleIcon.className = isPassword
    ? "fa-solid fa-eye-slash"
    : "fa-solid fa-eye";
}
