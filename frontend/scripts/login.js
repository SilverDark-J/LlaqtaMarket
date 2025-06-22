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
        body: JSON.stringify({ correo: correo, contrasenia: contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.tipo_usuario === "cliente") {
          window.location.href = "productos.html";
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
