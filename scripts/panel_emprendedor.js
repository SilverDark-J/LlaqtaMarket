let indiceEditar = null;

function mostrarSeccion(id) {
  // Actualiza contenido
  const plantilla = document.getElementById(id);
  const contenedor = document.getElementById("contenidoPrincipal");
  contenedor.innerHTML = "";
  contenedor.appendChild(plantilla.content.cloneNode(true));

  // Lógica específica por sección
  if (id === "productos") {
    mostrarMisProductos();
  }
  if (id === "agregar" && indiceEditar !== null) {
    cargarProductoParaEditar();
  }
  if (id === "configuracion") {
    cargarConfiguracion();
  }

  // ✅ Marcar como activo en el sidebar
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

function guardarProducto(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombreProducto").value;
  const precio = parseFloat(document.getElementById("precioProducto").value);
  const categoria = document.getElementById("categoriaProducto").value;
  const descripcion = document.getElementById("descripcionProducto").value;
  const imagenInput = document.getElementById("imagenProducto");
  const imagen = imagenInput.files[0] ? URL.createObjectURL(imagenInput.files[0]) : "";

  const productos = JSON.parse(localStorage.getItem("misProductos")) || [];

  const nuevoProducto = { nombre, precio, categoria, descripcion, imagen };

  if (indiceEditar !== null) {
    // Si está en modo edición
    if (!imagen) {
      nuevoProducto.imagen = productos[indiceEditar].imagen;
    }
    productos[indiceEditar] = nuevoProducto;
    indiceEditar = null;
    alert("Producto editado correctamente");
  } else {
    productos.push(nuevoProducto);
    alert("Producto guardado correctamente");
  }

  localStorage.setItem("misProductos", JSON.stringify(productos));
  mostrarSeccion('productos');
}

function mostrarMisProductos() {
  const productos = JSON.parse(localStorage.getItem("misProductos")) || [];
  const contenedor = document.getElementById("listaMisProductos");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  productos.forEach((prod, index) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";

    tarjeta.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <h3>${prod.nombre}</h3>
      <p>Categoría: ${prod.categoria}</p>
      <p>S/ ${prod.precio.toFixed(2)}</p>
      <button onclick="editarProducto(${index})">✏️ Editar</button>
      <button onclick="eliminarProducto(${index})">🗑️ Eliminar</button>
    `;

    contenedor.appendChild(tarjeta);
  });
}

function eliminarProducto(index) {
  const productos = JSON.parse(localStorage.getItem("misProductos")) || [];
  productos.splice(index, 1);
  localStorage.setItem("misProductos", JSON.stringify(productos));
  mostrarMisProductos();
}

function editarProducto(index) {
  indiceEditar = index;
  mostrarSeccion('agregar');
}

function cargarProductoParaEditar() {
  const productos = JSON.parse(localStorage.getItem("misProductos")) || [];
  const producto = productos[indiceEditar];

  document.getElementById("tituloFormulario").textContent = "Editar Producto";
  document.getElementById("nombreProducto").value = producto.nombre;
  document.getElementById("precioProducto").value = producto.precio;
  document.getElementById("categoriaProducto").value = producto.categoria;
  document.getElementById("descripcionProducto").value = producto.descripcion;
}

function togglePassword() {
  const input = document.getElementById("configContrasena");
  const button = document.querySelector(".toggle-pass");
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  button.textContent = isHidden ? "🙈" : "👁";
}

function guardarConfiguracion(event) {
  event.preventDefault();

  const datos = {
    nombre: document.getElementById("configNombre").value,
    apellido: document.getElementById("configApellido").value,
    emprendimiento: document.getElementById("configNombreEmprendimiento").value,
    correo: document.getElementById("configCorreo").value,
    contrasena: document.getElementById("configContrasena").value,
    telefono: document.getElementById("configTelefono").value,
    direccion: document.getElementById("configDireccion").value,
    descripcion: document.getElementById("configDescripcion").value
  };

  localStorage.setItem("datosEmprendedor", JSON.stringify(datos));

  // ✅ Actualizar el nombre del emprendimiento en el header
  document.querySelector(".nombre-emprendimiento").textContent = datos.emprendimiento;

  alert("Configuración guardada correctamente.");
}

function cargarConfiguracion() {
  const datos = JSON.parse(localStorage.getItem("datosEmprendedor"));
  if (!datos) return;

  document.getElementById("configNombre").value = datos.nombre || "";
  document.getElementById("configApellido").value = datos.apellido || "";
  document.getElementById("configNombreEmprendimiento").value = datos.emprendimiento || "";
  document.getElementById("configCorreo").value = datos.correo || "";
  document.getElementById("configContrasena").value = datos.contrasena || "";
  document.getElementById("configTelefono").value = datos.telefono || "";
  document.getElementById("configDireccion").value = datos.direccion || "";
  document.getElementById("configDescripcion").value = datos.descripcion || "";

  // Mostrar también el nombre en el header al cargar
  if (datos.emprendimiento) {
    document.querySelector(".nombre-emprendimiento").textContent = datos.emprendimiento;
  }
}

// Verificar si ya hay un emprendedor en localStorage, si no, cargar uno de ejemplo
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("datosEmprendedor")) {
    // Asegúrate de que emprendedoresEjemplo esté disponible en este archivo
    const emprendedorEjemplo = emprendedoresEjemplo[0]; // Cambia el índice si quieres otro emprendedor

    const datos = {
      nombre: emprendedorEjemplo.nombre,
      apellido: emprendedorEjemplo.apellido,
      emprendimiento: emprendedorEjemplo.nombre_emprendimiento,
      correo: emprendedorEjemplo.correo,
      contrasena: emprendedorEjemplo.contrasenia,
      telefono: emprendedorEjemplo.telefono,
      direccion: emprendedorEjemplo.direccion,
      descripcion: emprendedorEjemplo.descripcion,
      fechaRegistro: emprendedorEjemplo.fecha_registro
    };

    localStorage.setItem("datosEmprendedor", JSON.stringify(datos));
  }

  mostrarSeccion("configuracion");
  cargarConfiguracion(); // Aquí llamamos a cargarConfiguracion
});
