function mostrarSeccion(id) {
  const plantilla = document.getElementById(id);
  const contenedor = document.getElementById("contenidoPrincipal");
  contenedor.innerHTML = "";
  contenedor.appendChild(plantilla.content.cloneNode(true));

  if (id === "misPedidos") {
    cargarPedidos();
  }

  if (id === "favoritos") {
    cargarFavoritos();
  }

  if (id === "configuracion") {
    cargarConfiguracionUsuario();
  }

  const items = document.querySelectorAll(".sidebar li");
  items.forEach(li => li.classList.remove("activo"));
  const itemActivo = Array.from(items).find(li => li.getAttribute("onclick")?.includes(id));
  if (itemActivo) {
    itemActivo.classList.add("activo");
  }
}

function cerrarSesion() {
  alert("Sesión cerrada");
  window.location.href = "index.html";
}

function cargarPedidos() {
  const lista = document.getElementById("listaPedidos");
  if (!lista) return;

  lista.innerHTML = "<p>No tienes pedidos aún.</p>"; 
}

function cargarFavoritos() {
  const lista = document.getElementById("listaFavoritos");
  if (!lista) return;

  lista.innerHTML = "<p>No tienes productos favoritos aún.</p>"; 
}

function guardarConfiguracionUsuario(event) {
  event.preventDefault();

  const datos = {
    nombres: document.getElementById("usuarioNombre").value,
    apellidos: document.getElementById("usuarioApellido").value,
    correo: document.getElementById("usuarioCorreo").value,
    contrasena: document.getElementById("usuarioContrasena").value,
    direccion: document.getElementById("usuarioDireccion").value,
    telefono: document.getElementById("usuarioTelefono").value,
    fechaRegistro: document.getElementById("usuarioFechaRegistro").value
  };

  localStorage.setItem("datosUsuario", JSON.stringify(datos));
  alert("Configuración actualizada correctamente.");
}

function cargarConfiguracionUsuario() {
  const datos = JSON.parse(localStorage.getItem("datosUsuario"));
  if (!datos) return;

  document.getElementById("usuarioNombre").value = datos.nombres || "";
  document.getElementById("usuarioApellido").value = datos.apellidos || "";
  document.getElementById("usuarioCorreo").value = datos.correo || "";
  document.getElementById("usuarioContrasena").value = datos.contrasena || "";
  document.getElementById("usuarioDireccion").value = datos.direccion || "";
  document.getElementById("usuarioTelefono").value = datos.telefono || "";
  document.getElementById("usuarioFechaRegistro").value = datos.fechaRegistro || "";

  // Actualizar nombre en el header
  document.querySelector(".nombre-usuario").textContent = `Bienvenido, ${datos.nombres}`;
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("configuracion");
  cargarConfiguracionUsuario();
});