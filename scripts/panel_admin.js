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

// ====================== FUNCIONALIDADES CON LOS USUARIOS ======================

// Cargar usuarios
function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const contenedor = document.getElementById("listaUsuarios");
  contenedor.innerHTML = "";

  usuarios.forEach((usuario) => {
    const tr = document.createElement("tr");

    // Crear celdas con los datos del usuario
    tr.innerHTML = `
      <td>${usuario.id_usuario}</td>
      <td>${usuario.nombres}</td>
      <td>${usuario.apellidos}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.telefono}</td>
      <td>${usuario.fecha_registro}</td>
      <td>
        <button class="acciones-btn" onclick="mostrarOpciones(event, ${usuario.id_usuario})">⋮</button>
      </td>
    `;
    
    contenedor.appendChild(tr);
  });
}

// Mostrar opciones (Editar, Bloquear, Ver Historial) cuando se hace clic en "⋮"
function mostrarOpciones(event, id_usuario) {
  event.stopPropagation(); // Evitar que el clic cierre el menú al hacer clic en el botón

  // Verificar si ya existe un menú desplegable, si es así, eliminarlo
  const menusActivos = document.querySelectorAll('.menu-acciones');
  menusActivos.forEach(menu => menu.remove());

  // Crear un menú desplegable con las opciones
  const menu = document.createElement("div");
  menu.className = "menu-acciones";
  menu.innerHTML = `
    <ul>
      <li onclick="editarUsuario(${id_usuario})">Editar</li>
      <li onclick="bloquearUsuario(${id_usuario})">Bloquear</li>
      <li onclick="verHistorial(${id_usuario})">Ver Historial de Pedidos</li>
    </ul>
  `;

  // Posicionar el menú en el lugar correcto (debajo del botón)
  const button = event.target;
  button.parentNode.appendChild(menu);
}


// FUNCIÓN PARA EDITAR A LOS USUARIOS

// Abrir modal con datos del usuario
function editarUsuario(id_usuario) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.id_usuario === id_usuario);
  if (!usuario) return alert("Usuario no encontrado");

  // Llenar campos del formulario
  document.getElementById("edit-id_usuario").value = usuario.id_usuario;
  document.getElementById("edit-nombres").value = usuario.nombres;
  document.getElementById("edit-apellidos").value = usuario.apellidos;
  document.getElementById("edit-correo").value = usuario.correo;
  document.getElementById("edit-contrasenia").value = usuario.contrasenia;
  document.getElementById("edit-direccion").value = usuario.direccion;
  document.getElementById("edit-telefono").value = usuario.telefono;

  // Mostrar el modal
  document.getElementById("modalEditarUsuario").showModal();
}

// Guardar cambios del usuario
document.getElementById("formEditarUsuario").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("edit-id_usuario").value);
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const index = usuarios.findIndex(u => u.id_usuario === id);
  if (index === -1) return alert("Usuario no encontrado");

  usuarios[index].nombres = document.getElementById("edit-nombres").value;
  usuarios[index].apellidos = document.getElementById("edit-apellidos").value;
  usuarios[index].correo = document.getElementById("edit-correo").value;
  usuarios[index].contrasenia = document.getElementById("edit-contrasenia").value;
  usuarios[index].direccion = document.getElementById("edit-direccion").value;
  usuarios[index].telefono = document.getElementById("edit-telefono").value;

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  cerrarModal();
  cargarUsuarios();
  alert("Usuario actualizado correctamente.");
});

function cerrarModal() {
  document.getElementById("modalEditarUsuario").close();
}

function togglePassword() {
  const input = document.getElementById("edit-contrasenia");
  const button = document.querySelector(".toggle-pass");
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  button.textContent = isHidden ? "🙈" : "👁";
}


// Función para bloquear usuario
function bloquearUsuario(id_usuario) {
  alert(`Bloquear usuario con ID: ${id_usuario}`);
  // Aquí iría la lógica para bloquear al usuario (por ejemplo, cambiar su estado en la base de datos)
}

// Función para ver el historial de pedidos de un usuario
function verHistorial(id_usuario) {
  alert(`Ver historial de pedidos del usuario con ID: ${id_usuario}`);
  // Aquí iría la lógica para mostrar el historial de pedidos del usuario
}

// ====================== FUNCIONALIDADES CON LOS EMPRENDEDORES ======================

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

// Cerrar el menú si se hace clic fuera
document.addEventListener("click", (event) => {
  const menusActivos = document.querySelectorAll('.menu-acciones');
  menusActivos.forEach(menu => {
    // Verifica si el clic está fuera del menú y del botón de acciones
    if (!menu.contains(event.target) && !event.target.closest('.acciones-btn')) {
      menu.remove();
    }
  });
});
