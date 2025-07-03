const API_URL = "http://localhost:3000/api";
const token = localStorage.getItem("token");

function mostrarSeccion(id) {
  const plantilla = document.getElementById(id);
  const contenedor = document.getElementById("contenidoPrincipal");
  contenedor.innerHTML = "";
  contenedor.appendChild(plantilla.content.cloneNode(true));

  if (id === "clientes") {
    cargarClientes();
  } else if (id === "emprendedores") {
    cargarEmprendedores();
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
  window.location.href = "index.html";
}

// ====================== FUNCIONALIDADES CON LOS CLIENTES ======================

async function cargarClientes() {
  try {
    const res = await fetch(`${API_URL}/clientes/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const clientes = await res.json();
    const contenedor = document.getElementById("listaClientes");
    contenedor.innerHTML = "";

    if (!Array.isArray(clientes)) throw new Error("Respuesta inválida");

    clientes.forEach((cliente) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${cliente.id_cliente}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        <td>${cliente.correo}</td>
        <td>${cliente.telefono}</td>
        <td>${new Date(cliente.fecha_registro).toLocaleDateString()}</td>
        <td>
          <button class="acciones-btn" onclick="mostrarOpciones(event, ${
            cliente.id_cliente
          }, 'cliente')">⋮</button>
        </td>
      `;
      contenedor.appendChild(tr);
    });
  } catch (err) {
    console.error("Error al cargar clientes:", err);
  }
}

function mostrarOpciones(event, id, tipo) {
  event.stopPropagation();
  document.querySelectorAll(".menu-acciones").forEach((m) => m.remove());

  const menu = document.createElement("div");
  menu.className = "menu-acciones";
  menu.innerHTML = `
    <ul>
      <li onclick="editar${capitalize(tipo)}(${id})">Editar</li>
      <li onclick="bloquear${capitalize(tipo)}(${id})">Bloquear</li>
    </ul>
  `;
  event.target.parentNode.appendChild(menu);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function editarCliente(id_cliente) {
  try {
    const res = await fetch(`${API_URL}/clientes/admin/${id_cliente}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const cliente = await res.json();

    document.getElementById("edit-id_cliente").value = id_cliente;
    document.getElementById("edit-nombres").value = cliente.nombres;
    document.getElementById("edit-apellidos").value = cliente.apellidos;
    document.getElementById("edit-correo-cli").value = cliente.correo;
    document.getElementById("edit-contrasenia-cli").value = "";
    document.getElementById("edit-direccion-cli").value =
      cliente.direccion || "";
    document.getElementById("edit-telefono-cli").value = cliente.telefono;

    document.getElementById("modalEditarCliente").showModal();
  } catch (err) {
    console.error("Error al obtener cliente:", err);
  }
}

document
  .getElementById("formEditarCliente")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const cliente = {
      id_cliente: document.getElementById("edit-id_cliente").value,
      nombres: document.getElementById("edit-nombres").value,
      apellidos: document.getElementById("edit-apellidos").value,
      correo: document.getElementById("edit-correo-cli").value,
      contrasenia: document.getElementById("edit-contrasenia-cli").value,
      direccion: document.getElementById("edit-direccion-cli").value,
      telefono: document.getElementById("edit-telefono-cli").value,
    };

    try {
      const res = await fetch(
        `${API_URL}/clientes/admin/${cliente.id_cliente}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cliente),
        }
      );
      await res.json();
      cerrarModal();
      cargarClientes();
      alert("Cliente actualizado correctamente.");
    } catch (err) {
      console.error("Error al actualizar cliente:", err);
    }
  });

async function bloquearCliente(id_cliente) {
  try {
    const res = await fetch(`${API_URL}/usuarios/${id_cliente}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nuevo_estado: "bloqueado" }),
    });
    await res.json();
    alert("Cliente bloqueado correctamente.");
    cargarClientes();
  } catch (err) {
    console.error("Error al bloquear cliente:", err);
  }
}

function togglePassword(id, btn) {
  const input = document.getElementById(id);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  btn.textContent = isHidden ? "🙈" : "👁";
}

function cerrarModal() {
  document.getElementById("modalEditarCliente").close();
  document.getElementById("modalEditarEmprendedor").close();
}

// ====================== FUNCIONALIDADES CON LOS EMPRENDEDORES ======================

async function cargarEmprendedores() {
  try {
    const res = await fetch(`${API_URL}/emprendedores/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const emprendedores = await res.json();
    const contenedor = document.getElementById("listaEmprendedores");
    contenedor.innerHTML = "";

    if (!Array.isArray(emprendedores)) throw new Error("Respuesta inválida");

    emprendedores.forEach((emp) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${emp.id_emprendedor}</td>
        <td>${emp.nombres}</td>
        <td>${emp.apellidos}</td>
        <td>${emp.nombre_emprendimiento}</td>
        <td>${emp.correo}</td>
        <td>${emp.telefono}</td>
        <td>${new Date(emp.fecha_registro).toLocaleDateString()}</td>
        <td>
          <button class="acciones-btn" onclick="mostrarOpciones(event, ${
            emp.id_emprendedor
          }, 'emprendedor')">⋮</button>
        </td>
      `;
      contenedor.appendChild(tr);
    });
  } catch (err) {
    console.error("Error al cargar emprendedores:", err);
  }
}

async function editarEmprendedor(id_emprendedor) {
  try {
    const res = await fetch(
      `${API_URL}/emprendedores/admin/${id_emprendedor}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const emprendedor = await res.json();

    document.getElementById("edit-id_emprendedor").value = id_emprendedor;
    document.getElementById("edit-nombre").value = emprendedor.nombres;
    document.getElementById("edit-apellido").value = emprendedor.apellidos;
    document.getElementById("edit-nombre_emprendimiento").value =
      emprendedor.nombre_emprendimiento;
    document.getElementById("edit-correo-empr").value = emprendedor.correo;
    document.getElementById("edit-contrasenia-empr").value = "";
    document.getElementById("edit-telefono-empr").value = emprendedor.telefono;
    document.getElementById("edit-direccion-empr").value =
      emprendedor.direccion || "";
    document.getElementById("edit-descripcion").value =
      emprendedor.descripcion || "";

    document.getElementById("modalEditarEmprendedor").showModal();
  } catch (err) {
    console.error("Error al obtener emprendedor:", err);
  }
}

document
  .getElementById("formEditarEmprendedor")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const emprendedor = {
      id_emprendedor: document.getElementById("edit-id_emprendedor").value,
      nombres: document.getElementById("edit-nombre").value,
      apellidos: document.getElementById("edit-apellido").value,
      correo: document.getElementById("edit-correo-empr").value,
      contrasenia: document.getElementById("edit-contrasenia-empr").value,
      nombre_emprendimiento: document.getElementById(
        "edit-nombre_emprendimiento"
      ).value,
      telefono: document.getElementById("edit-telefono-empr").value,
      direccion: document.getElementById("edit-direccion-empr").value,
      descripcion: document.getElementById("edit-descripcion").value,
    };

    try {
      const res = await fetch(
        `${API_URL}/emprendedores/admin/${emprendedor.id_emprendedor}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(emprendedor),
        }
      );
      await res.json();
      cerrarModal();
      cargarEmprendedores();
      alert("Emprendedor actualizado correctamente.");
    } catch (err) {
      console.error("Error al actualizar emprendedor:", err);
    }
  });

async function bloquearEmprendedor(id_emprendedor) {
  try {
    const res = await fetch(`${API_URL}/usuarios/${id_emprendedor}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nuevo_estado: "bloqueado" }),
    });
    await res.json();
    alert("Emprendedor bloqueado correctamente.");
    cargarEmprendedores();
  } catch (err) {
    console.error("Error al bloquear emprendedor:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("clientes");
});

document.addEventListener("click", (event) => {
  document.querySelectorAll(".menu-acciones").forEach((menu) => {
    if (
      !menu.contains(event.target) &&
      !event.target.closest(".acciones-btn")
    ) {
      menu.remove();
    }
  });
});
