document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = form.elements[0].value.trim();
    const apellido = form.elements[1].value.trim();
    const nombreEmprendimiento = form.elements[2].value.trim();
    const correo = form.elements[3].value.trim();
    const contraseña = form.elements[4].value.trim();

    // Validación de nombre y apellido (mínimo 3 caracteres)
    if (!nombre || nombre.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (!apellido || apellido.length < 3) {
      alert("El apellido debe tener al menos 3 caracteres.");
      return;
    }

    if (!nombreEmprendimiento || nombreEmprendimiento.length < 3) {
      alert("El nombre del emprendimiento debe tener al menos 3 caracteres.");
      return;
    }

    if (!correo || !validarCorreo(correo)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    if (
      !contraseña ||
      contraseña.length < 8 ||
      !validarContraseña(contraseña)
    ) {
      alert(
        "La contraseña debe tener al menos 8 caracteres, incluir letras, números y uno de los siguientes caracteres especiales: punto, coma, guion o guion bajo."
      );
      return;
    }

    // Ahora enviamos al backend
    try {
      const response = await fetch(
        "http://localhost:3000/api/usuarios/registro",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombres: nombre,
            apellidos: apellido,
            correo: correo,
            contrasenia: contraseña,
            tipo_usuario: "emprendedor",
            nombre_emprendimiento: nombreEmprendimiento,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ Registro exitoso. ¡Bienvenido a LlaqtaMarket!");
        form.reset();
        window.location.href = "index.html";
      } else {
        alert("❌ Error: " + data.mensaje);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error al conectar con el servidor");
    }
  });

  function validarCorreo(correo) {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(correo);
  }

  function validarContraseña(contraseña) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
    return regex.test(contraseña);
  }
});
