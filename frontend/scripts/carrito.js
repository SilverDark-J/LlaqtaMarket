// Productos de ejemplo
const productos = [
  {
    id: "tv",
    nombre: "Televisor HISENSE QLED 65''",
    precio: 1499.00,
    cantidad: 1,
    imagen: "media/TV.png"
  },
  {
    id: "bidon",
    nombre: "Botella Bidón VIVA HOME 2L",
    precio: 6.90,
    cantidad: 1,
    imagen: "media/bidon.jpg"
  }
];

function renderizarProductos() {
  const tbody = document.getElementById("cuerpo-tabla");
  tbody.innerHTML = "";

  productos.forEach((producto) => {
    const tr = document.createElement("tr");

    // Celda: Producto
    const tdProducto = document.createElement("td");
    tdProducto.setAttribute("data-label", "Producto");
    tdProducto.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}"><br>
      ${producto.nombre}
    `;
    tr.appendChild(tdProducto);

    // Celda: Precio
    const tdPrecio = document.createElement("td");
    tdPrecio.setAttribute("data-label", "Precio");
    tdPrecio.textContent = `S/ ${producto.precio.toFixed(2)}`;
    tr.appendChild(tdPrecio);

    // Celda: Cantidad
    const tdCantidad = document.createElement("td");
    tdCantidad.setAttribute("data-label", "Cantidad");
    tdCantidad.innerHTML = `
      <div class="cantidad-control">
        <button onclick="cambiarCantidad('${producto.id}', -1)">−</button>
        <span id="cantidad-${producto.id}">${producto.cantidad}</span>
        <button onclick="cambiarCantidad('${producto.id}', 1)">+</button>
      </div>
    `;
    tr.appendChild(tdCantidad);

    // Celda: Total
    const tdTotal = document.createElement("td");
    tdTotal.setAttribute("data-label", "Total");
    tdTotal.innerHTML = `S/ <span id="total-${producto.id}">${(producto.precio * producto.cantidad).toFixed(2)}</span>`;
    tr.appendChild(tdTotal);

    // Celda: Eliminar
    const tdEliminar = document.createElement("td");
    tdEliminar.setAttribute("data-label", "Acción");
    tdEliminar.innerHTML = `<button class="eliminar-btn" onclick="eliminarProducto('${producto.id}')">Eliminar</button>`;
    tr.appendChild(tdEliminar);

    tbody.appendChild(tr);
  });

  actualizarResumen();
}

function cambiarCantidad(id, cambio) {
  const producto = productos.find(p => p.id === id);
  producto.cantidad = Math.max(1, producto.cantidad + cambio);
  document.getElementById(`cantidad-${id}`).textContent = producto.cantidad;
  document.getElementById(`total-${id}`).textContent = (producto.precio * producto.cantidad).toFixed(2);
  actualizarResumen();
}

function eliminarProducto(id) {
  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    productos.splice(index, 1);
    renderizarProductos();
  }
}

function actualizarResumen() {
  let subtotal = 0;
  let cantidadTotal = 0;

  productos.forEach(p => {
    subtotal += p.precio * p.cantidad;
    cantidadTotal += p.cantidad;
  });

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("cantidad-total").textContent = cantidadTotal;
}

renderizarProductos();
