let indiceEditar = null;

// Mostrar secciones del menú
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
  if (itemActivo) itemActivo.classList.add("activo");

  if (id === "agregar") {
    const input = document.getElementById("imagenProducto");
    input.addEventListener("change", previsualizarImagenes);
  }
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("tipo_usuario");
  window.location.href = "index.html";
}

// Previsualización de imágenes (solo para producto, local)
function previsualizarImagenes() {
  const input = document.getElementById("imagenProducto");
  const preview = document.getElementById("previewImagenes");
  preview.innerHTML = "";

  Array.from(input.files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

// Cargar datos de configuración del emprendedor desde la API
async function cargarConfiguracion() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No hay sesión activa.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/emprendedores", {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) throw new Error("Error al obtener datos");

    const datos = await response.json();

    document.getElementById("configNombre").value = datos.nombres || "";
    document.getElementById("configApellido").value = datos.apellidos || "";
    document.getElementById("configNombreEmprendimiento").value =
      datos.nombre_emprendimiento || "";
    document.getElementById("configCorreo").value = datos.correo || "";
    document.getElementById("configContrasena").value = "";
    document.getElementById("configTelefono").value = datos.telefono || "";
    document.getElementById("configDireccion").value = datos.direccion || "";
    document.getElementById("configDescripcion").value =
      datos.descripcion || "";

    document.querySelector(".nombre-emprendimiento").textContent =
      datos.nombre_emprendimiento || "Emprendedor";
  } catch (error) {
    console.error("Error:", error);
    alert("Error al cargar la configuración");
  }
}

// Guardar cambios de configuración
async function guardarConfiguracion(event) {
  event.preventDefault();

  const datosActualizados = {
    nombres: document.getElementById("configNombre").value,
    apellidos: document.getElementById("configApellido").value,
    contrasenia: document.getElementById("configContrasena").value,
    telefono: document.getElementById("configTelefono").value,
    direccion: document.getElementById("configDireccion").value,
    descripcion: document.getElementById("configDescripcion").value,
    categoria: null, // (opcional: si en el futuro agregas categoría)
    logo_url: null, // (opcional: si agregas subida de logos)
  };

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/emprendedores", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(datosActualizados),
    });

    if (response.ok) {
      alert("Datos actualizados correctamente");
      cargarConfiguracion();
    } else {
      const data = await response.json();
      alert("Error al actualizar: " + (data.error || ""));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error de red al actualizar");
  }
}

// ---- PARTE PRODUCTOS ---- (Mantenemos momentáneamente el manejo local de productos)
function obtenerIdEmprendedorDesdeToken(token) {
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id_emprendedor;
}

async function guardarProducto(event) {
  event.preventDefault();

  const token = localStorage.getItem("token");
  const id_emprendedor = obtenerIdEmprendedorDesdeToken(token); // Este es importante
  if (!id_emprendedor) {
    alert("No se pudo obtener el ID del emprendedor.");
    return;
  }

  const formData = new FormData();
  formData.append("nombre", document.getElementById("nombreProducto").value);
  formData.append("precio", document.getElementById("precioProducto").value);
  formData.append(
    "categoria",
    document.getElementById("categoriaProducto").value
  );
  formData.append(
    "descripcion",
    document.getElementById("descripcionProducto").value
  );

  const imagenInput = document.getElementById("imagenProducto");
  if (imagenInput.files.length > 0) {
    formData.append("imagenProducto", imagenInput.files[0]);
  } else {
    alert("Debes seleccionar una imagen.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/productos/${id_emprendedor}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      }
    );

    if (response.ok) {
      alert("Producto guardado correctamente");
      mostrarSeccion("productos");
    } else {
      const data = await response.json();
      alert("Error al guardar: " + (data.error || ""));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al registrar el producto");
  }
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
      .map((src) => `<img src="${src}" alt="${prod.nombre}">`)
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
  producto.imagenes.forEach((src) => {
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

document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("configuracion");
  cargarConfiguracion();
});
