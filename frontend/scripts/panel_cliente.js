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
  localStorage.removeItem("token");
  localStorage.removeItem("tipo_usuario");
  window.location.href = "index.html";
}

async function cargarConfiguracionCliente() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No hay sesión activa.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/usuarios/cliente", {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener la información del cliente");
    }

    const datos = await response.json();

    document.getElementById("clienteNombre").value = datos.nombres || "";
    document.getElementById("clienteApellido").value = datos.apellidos || "";
    document.getElementById("clienteCorreo").value = datos.correo || "";
    document.getElementById("clienteContrasena").value = "";
    document.getElementById("clienteDireccion").value = datos.direccion || "";
    document.getElementById("clienteTelefono").value = datos.telefono || "";
    document.getElementById("clienteFechaRegistro").value =
      datos.fecha_registro.split("T")[0];

    document.querySelector(
      ".nombre-cliente"
    ).textContent = `Bienvenido, ${datos.nombres}`;
  } catch (error) {
    console.error("Error al cargar cliente:", error);
    alert("Error al cargar datos del cliente");
  }
}

async function guardarConfiguracionCliente(event) {
  event.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("No hay sesión activa.");
    window.location.href = "login.html";
    return;
  }

  const datosActualizados = {
    nombres: document.getElementById("clienteNombre").value,
    apellidos: document.getElementById("clienteApellido").value,
    direccion: document.getElementById("clienteDireccion").value,
    telefono: document.getElementById("clienteTelefono").value,
    contrasenia: document.getElementById("clienteContrasena").value,
  };

  try {
    const response = await fetch("http://localhost:3000/api/usuarios/cliente", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(datosActualizados),
    });

    if (response.ok) {
      alert("Datos actualizados correctamente");
    } else {
      alert("Error al actualizar datos");
    }
  } catch (error) {
    console.error("Error al actualizar:", error);
    alert("Error en la actualización");
  }
}

function cargarPedidos() {
  const lista = document.getElementById("listaPedidos");
  lista.innerHTML = "<p>En construcción: Listado de pedidos del cliente.</p>";
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("configuracion");
});
