function mostrarSeccion(id) {
  const plantilla = document.getElementById(id);
  const contenedor = document.getElementById("contenidoPrincipal");
  contenedor.innerHTML = "";
  contenedor.appendChild(plantilla.content.cloneNode(true));
  
  if (id === "usuarios") {
    cargarUsuarios();
  } else if (id === "emprendedores") {
    cargarEmprendedores();
  } else if (id === "pedidos") {
    cargarPedidos();
  }

  const items = document.querySelectorAll(".sidebar li");
  items.forEach(li => li.classList.remove("activo"));
  const itemActivo = Array.from(items).find(li => li.getAttribute("onclick")?.includes(id));
  if (itemActivo) {
    itemActivo.classList.add("activo");
  }
}
  
function cerrarSesion() {
  window.location.href = "index.html";
}
  
  // Cargar usuarios
function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const contenedor = document.getElementById("listaUsuarios");
  contenedor.innerHTML = "";

  usuarios.forEach((usuario) => {
    const div = document.createElement("div");
    div.className = "tarjeta-producto";
    div.innerHTML = `
      <h3>${usuario.nombres} ${usuario.apellidos}</h3>
      <p><strong>Correo:</strong> ${usuario.correo}</p>
      <p><strong>Dirección:</strong> ${usuario.direccion}</p>
      <p><strong>Teléfono:</strong> ${usuario.telefono}</p>
      <p><strong>Registrado el:</strong> ${usuario.fechaRegistro}</p>
    `;
    contenedor.appendChild(div);
  });
}
  
  // Cargar emprendedores
  function cargarEmprendedores() {
    const emprendedores = JSON.parse(localStorage.getItem("emprendedores")) || [];
    const contenedor = document.getElementById("listaEmprendedores");
    contenedor.innerHTML = "";
  
    emprendedores.forEach((emp) => {
      const div = document.createElement("div");
      div.className = "tarjeta-producto";
      div.innerHTML = `
        <h3>${emp.nombreEmprendimiento}</h3>
        <p><strong>Propietario:</strong> ${emp.nombre} ${emp.apellido}</p>
        <p><strong>Correo:</strong> ${emp.correo}</p>
        <p><strong>Teléfono:</strong> ${emp.telefono}</p>
        <p><strong>Dirección:</strong> ${emp.direccion}</p>
        <p><strong>Descripción:</strong> ${emp.descripcion}</p>
      `;
      contenedor.appendChild(div);
    });
  }
  
  // Cargar pedidos
  function cargarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const contenedor = document.getElementById("listaPedidosAdmin");
    contenedor.innerHTML = "";
  
    pedidos.forEach((pedido) => {
      const usuario = usuarios.find(u => u.id === pedido.usuarioId);
      const div = document.createElement("div");
      div.className = "tarjeta-producto";
  
      const productosHTML = pedido.productos.map(p =>
        `<li>${p.nombre} (x${p.cantidad}) - S/ ${p.precio}</li>`
      ).join("");
  
      div.innerHTML = `
        <h3>Pedido #${pedido.id}</h3>
        <p><strong>Usuario:</strong> ${usuario ? usuario.nombres : "Desconocido"}</p>
        <p><strong>Fecha:</strong> ${pedido.fecha}</p>
        <p><strong>Total:</strong> S/ ${pedido.total}</p>
        <p><strong>Productos:</strong></p>
        <ul>${productosHTML}</ul>
      `;
      contenedor.appendChild(div);
    });
  }
  
  // Al cargar la página, mostrar usuarios por defecto
  document.addEventListener("DOMContentLoaded", () => {
    mostrarSeccion("usuarios");
  });
  