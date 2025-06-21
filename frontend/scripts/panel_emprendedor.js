let indiceEditar = null;

function mostrarSeccion(id) {
  const plantilla = document.getElementById(id);
  const contenedor = document.getElementById("contenidoPrincipal");
  contenedor.innerHTML = "";
  contenedor.appendChild(plantilla.content.cloneNode(true));

  if (id === "productos") {
    mostrarMisProductos();
  }

  if (id === "agregar" && indiceEditar !== null) {
    cargarProductoParaEditar();
  }

  if (id === "configuracion") {
    cargarConfiguracion();
  }

  const items = document.querySelectorAll(".sidebar li");
  items.forEach((li) => li.classList.remove("activo"));
  const itemActivo = Array.from(items).find((li) =>
    li.getAttribute("onclick")?.includes(id)
  );
  if (itemActivo) {
    itemActivo.classList.add("activo");
  }

  if (id === "agregar") {
    const input = document.getElementById("imagenProducto");
    input.addEventListener("change", previsualizarImagenes);
  }
}

function cerrarSesion() {
  alert("Sesión cerrada");
  window.location.href = "index.html";
}

function previsualizarImagenes() {
  const input = document.getElementById("imagenProducto");
  const preview = document.getElementById("previewImagenes");
  preview.innerHTML = "";

<<<<<<< HEAD
  Array.from(input.files).forEach((file) => {
=======
  Array.from(input.files).forEach(file => {
>>>>>>> origin/pruebas
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file); // Convierte a base64
  });
}

function guardarProducto(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombreProducto").value;
  const precio = parseFloat(document.getElementById("precioProducto").value);
  const categoria = document.getElementById("categoriaProducto").value;
  const descripcion = document.getElementById("descripcionProducto").value;
  const imagenInput = document.getElementById("imagenProducto");

  const productos = JSON.parse(localStorage.getItem("misProductos")) || [];

<<<<<<< HEAD
  const leerImagenes = Array.from(imagenInput.files).map((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
=======
  const leerImagenes = Array.from(imagenInput.files).map(file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
>>>>>>> origin/pruebas
      reader.readAsDataURL(file);
    });
  });

<<<<<<< HEAD
  Promise.all(leerImagenes).then((imagenesBase64) => {
    const nuevoProducto = {
      nombre,
      precio,
      categoria,
      descripcion,
      imagenes: imagenesBase64,
    };
=======
  Promise.all(leerImagenes).then(imagenesBase64 => {
    const nuevoProducto = { nombre, precio, categoria, descripcion, imagenes: imagenesBase64 };
>>>>>>> origin/pruebas

    if (indiceEditar !== null) {
      if (imagenesBase64.length === 0) {
        nuevoProducto.imagenes = productos[indiceEditar].imagenes;
      }
      productos[indiceEditar] = nuevoProducto;
      indiceEditar = null;
      alert("Producto editado correctamente");
    } else {
      productos.push(nuevoProducto);
      alert("Producto guardado correctamente");
    }

    localStorage.setItem("misProductos", JSON.stringify(productos));
    mostrarSeccion("productos");
  });
}

function mostrarMisProductos() {
  const productos = JSON.parse(localStorage.getItem("misProductos")) || [];
  const contenedor = document.getElementById("listaMisProductos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  productos.forEach((prod, index) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";

    const imagenesHTML = prod.imagenes
<<<<<<< HEAD
      .map((src) => `<img src="${src}" alt="${prod.nombre}">`)
=======
      .map(src => `<img src="${src}" alt="${prod.nombre}">`)
>>>>>>> origin/pruebas
      .join("");

    tarjeta.innerHTML = `
      <div class="imagenes-producto">${imagenesHTML}</div>
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
  mostrarSeccion("agregar");
}

function cargarProductoParaEditar() {
  const productos = JSON.parse(localStorage.getItem("misProductos")) || [];
  const producto = productos[indiceEditar];

  document.getElementById("tituloFormulario").textContent = "Editar Producto";
  document.getElementById("nombreProducto").value = producto.nombre;
  document.getElementById("precioProducto").value = producto.precio;
  document.getElementById("categoriaProducto").value = producto.categoria;
  document.getElementById("descripcionProducto").value = producto.descripcion;

  const preview = document.getElementById("previewImagenes");
  preview.innerHTML = "";
<<<<<<< HEAD
  producto.imagenes.forEach((src) => {
=======
  producto.imagenes.forEach(src => {
>>>>>>> origin/pruebas
    const img = document.createElement("img");
    img.src = src;
    preview.appendChild(img);
  });
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
    descripcion: document.getElementById("configDescripcion").value,
  };

  localStorage.setItem("datosEmprendedor", JSON.stringify(datos));
<<<<<<< HEAD
  document.querySelector(".nombre-emprendimiento").textContent =
    datos.emprendimiento;
=======
  document.querySelector(".nombre-emprendimiento").textContent = datos.emprendimiento;
>>>>>>> origin/pruebas

  alert("Configuración guardada correctamente.");
}

function cargarConfiguracion() {
  const datos = JSON.parse(localStorage.getItem("datosEmprendedor"));
  if (!datos) return;

  document.getElementById("configNombre").value = datos.nombre || "";
  document.getElementById("configApellido").value = datos.apellido || "";
  document.getElementById("configNombreEmprendimiento").value =
    datos.emprendimiento || "";
  document.getElementById("configCorreo").value = datos.correo || "";
  document.getElementById("configContrasena").value = datos.contrasena || "";
  document.getElementById("configTelefono").value = datos.telefono || "";
  document.getElementById("configDireccion").value = datos.direccion || "";
  document.getElementById("configDescripcion").value = datos.descripcion || "";

  if (datos.emprendimiento) {
    document.querySelector(".nombre-emprendimiento").textContent =
      datos.emprendimiento;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("datosEmprendedor")) {
    const emprendedorEjemplo = emprendedoresEjemplo[0];
    const datos = {
      nombre: emprendedorEjemplo.nombre,
      apellido: emprendedorEjemplo.apellido,
      emprendimiento: emprendedorEjemplo.nombre_emprendimiento,
      correo: emprendedorEjemplo.correo,
      contrasena: emprendedorEjemplo.contrasenia,
      telefono: emprendedorEjemplo.telefono,
      direccion: emprendedorEjemplo.direccion,
      descripcion: emprendedorEjemplo.descripcion,
      fechaRegistro: emprendedorEjemplo.fecha_registro,
    };
    localStorage.setItem("datosEmprendedor", JSON.stringify(datos));
  }

  mostrarSeccion("configuracion");
  cargarConfiguracion();
});
