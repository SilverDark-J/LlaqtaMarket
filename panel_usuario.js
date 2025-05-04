function mostrarSeccion(id) {
    const contenedor = document.getElementById("contenidoPrincipal");
    const template = document.getElementById(id);
    contenedor.innerHTML = "";
    if (template) {
      contenedor.appendChild(template.content.cloneNode(true));
    }
  }
  
  function guardarConfiguracionUsuario(event) {
    event.preventDefault();
  
    const datos = {
      nombre: document.getElementById("usuarioNombre").value,
      apellido: document.getElementById("usuarioApellido").value,
      correo: document.getElementById("usuarioCorreo").value,
      contrasena: document.getElementById("usuarioContrasena").value,
    };
  
    localStorage.setItem("datosUsuario", JSON.stringify(datos));
    alert("Cambios guardados correctamente.");
  }
  
  function cargarConfiguracionUsuario() {
    const datos = JSON.parse(localStorage.getItem("datosUsuario"));
    if (!datos) return;
  
    document.getElementById("usuarioNombre").value = datos.nombre || "";
    document.getElementById("usuarioApellido").value = datos.apellido || "";
    document.getElementById("usuarioCorreo").value = datos.correo || "";
    document.getElementById("usuarioContrasena").value = datos.contrasena || "";
  }
  
  function cerrarSesion() {
    window.location.href = "index.html";
  }
  