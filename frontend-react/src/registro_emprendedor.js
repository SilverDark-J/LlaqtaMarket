document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistro");
  const inputs = form.querySelectorAll("input");
  const boton = form.querySelector("button");

  const errores = {};

  // Agrega elementos para mostrar errores
  inputs.forEach((input) => {
    const spanError = document.createElement("span");
    spanError.classList.add("error-text");
    input.parentNode.insertBefore(spanError, input.nextSibling);

    input.addEventListener("blur", () => validarCampo(input));
    input.addEventListener("input", () => validarCampo(input));
  });

  function mostrarError(input, mensaje) {
    input.classList.add("input-error");
    input.classList.remove("input-ok");
    input.nextElementSibling.textContent = mensaje;
  }

  function limpiarError(input) {
    input.classList.remove("input-error");
    input.classList.add("input-ok");
    input.nextElementSibling.textContent = "";
  }

  function validarCampo(input) {
    const value = input.value.trim();
    const placeholder = input.placeholder;

    if (placeholder.includes("nombre") && value.length < 3) {
      mostrarError(input, "Debe tener al menos 3 caracteres.");
      return false;
    }

    if (placeholder.includes("apellido") && value.length < 3) {
      mostrarError(input, "Debe tener al menos 3 caracteres.");
      return false;
    }

    if (placeholder.includes("Emprendimiento") && value.length < 3) {
      mostrarError(input, "Debe tener al menos 3 caracteres.");
      return false;
    }

    if (placeholder.includes("Correo") && !validarCorreo(value)) {
      mostrarError(input, "Correo inválido.");
      return false;
    }

    if (placeholder.includes("Contraseña") && !validarContrasenia(value)) {
      mostrarError(
        input,
        "Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (.,-_)."
      );
      return false;
    }

    limpiarError(input);
    return true;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valido = true;
    inputs.forEach((input) => {
      if (!validarCampo(input)) valido = false;
    });

    if (!valido) {
      alert("Corrige los errores antes de enviar.");
      return;
    }

    const [nombre, apellido, nombreEmprendimiento, correo, contrasenia] =
      Array.from(inputs).map((i) => i.value.trim());

    try {
      boton.disabled = true;
      boton.textContent = "Registrando...";

      const response = await fetch("http://localhost:3000/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombres: nombre,
          apellidos: apellido,
          correo,
          contrasenia,
          tipo_usuario: "emprendedor",
          nombre_emprendimiento: nombreEmprendimiento,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Registro exitoso. ¡Bienvenido a LlaqtaMarket!");
        form.reset();
        inputs.forEach((input) => limpiarError(input));
        window.location.href = "panel_emprendedor.html";
      } else {
        alert("❌ Error: " + (data.mensaje || "No se pudo registrar."));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error al conectar con el servidor.");
    } finally {
      boton.disabled = false;
      boton.textContent = "REGISTRARSE";
    }
  });

  function validarCorreo(correo) {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(correo);
  }

  function validarContrasenia(contrasenia) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
    return regex.test(contrasenia);
  }
});
