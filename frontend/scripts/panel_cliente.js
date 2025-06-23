function mostrarSeccion(id) {
  const plantilla = document.getElementById(id);
  const contenedor = document.getElementById("contenidoPrincipal");
  contenedor.innerHTML = "";
  contenedor.appendChild(plantilla.content.cloneNode(true));

  if (id === "misPedidos") {
    cargarPedidos();
  } else if (id === "configuracion") {
    cargarConfiguracionCliente();
  }

  const items = document.querySelectorAll(".sidebar li");
  items.forEach((li) => li.classList.remove("activo"));
  const itemActivo = Array.from(items).find((li) =>
    li.getAttribute("onclick")?.includes(id)
  );
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

function guardarConfiguracionCliente(event) {
  event.preventDefault();

  const datos = {
    nombres: document.getElementById("clienteNombre").value,
    apellidos: document.getElementById("clienteApellido").value,
    correo: document.getElementById("clienteCorreo").value,
    contrasena: document.getElementById("clienteContrasena").value,
    direccion: document.getElementById("clienteDireccion").value,
    telefono: document.getElementById("clienteTelefono").value,
    fechaRegistro: document.getElementById("clienteFechaRegistro").value,
  };

  localStorage.setItem("datosCliente", JSON.stringify(datos));
  alert("Configuración actualizada correctamente.");
}

function cargarConfiguracionCliente() {
  const datos = JSON.parse(localStorage.getItem("datosCliente"));
  if (!datos) return;

  document.getElementById("clienteNombre").value = datos.nombres || "";
  document.getElementById("clienteApellido").value = datos.apellidos || "";
  document.getElementById("clienteCorreo").value = datos.correo || "";
  document.getElementById("clienteContrasena").value = datos.contrasena || "";
  document.getElementById("clienteDireccion").value = datos.direccion || "";
  document.getElementById("clienteTelefono").value = datos.telefono || "";
  document.getElementById("clienteFechaRegistro").value =
    datos.fechaRegistro || "";

  // Actualizar nombre en el header
  document.querySelector(
    ".nombre-cliente"
  ).textContent = `Bienvenido, ${datos.nombres}`;
}

// Verificar si ya hay un cliente en localStorage, si no, cargar uno de ejemplo
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("datosCliente")) {
    // Asegúrate de que clientesEjemplo esté disponible en este archivo
    const clienteEjemplo = clientesEjemplo[0]; // Cambia el índice si quieres otro cliente

    const datos = {
      nombres: clienteEjemplo.nombres,
      apellidos: clienteEjemplo.apellidos,
      correo: clienteEjemplo.correo,
      contrasena: clienteEjemplo.contrasenia,
      direccion: clienteEjemplo.direccion,
      telefono: clienteEjemplo.telefono,
      fechaRegistro: clienteEjemplo.fecha_registro,
    };

    localStorage.setItem("datosCliente", JSON.stringify(datos));
  }

  mostrarSeccion("configuracion");
  cargarConfiguracionCliente();
});
