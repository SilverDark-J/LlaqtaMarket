document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const correo = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    if (!correo || !contrasena) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(correo)) {
      alert("El correo electrónico no tiene un formato válido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correo, contrasena: contrasena }),
      });  

      const data = await response.json();

      if (response.ok) {
        // Guardamos el token en el localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("tipo_usuario", data.tipo_usuario);

        if (data.tipo_usuario === "cliente") {
          window.location.href = "panel_cliente.html";
        } else if (data.tipo_usuario === "emprendedor") {
          window.location.href = "panel_emprendedor.html";
        } else if (data.tipo_usuario === "administrador") {
          window.location.href = "panel_admin.html";
        } else {
          alert("Tipo de usuario no reconocido.");
        }
      } else {
        alert("❌ " + data.mensaje);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  });
const campos = ["usuario", "contrasena"];

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

  if (id === "usuario") {
    const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!regexCorreo.test(valor)) mensaje = "Correo inválido.";
  }

  if (id === "contrasena") {
    const regexContrasena =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
    if (!regexContrasena.test(valor)) {
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
  const passwordInput = document.getElementById("contrasena");
  const toggleIcon = document.getElementById("toggleIcon");

  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  toggleIcon.className = isPassword
    ? "fa-solid fa-eye-slash"
    : "fa-solid fa-eye";
}
