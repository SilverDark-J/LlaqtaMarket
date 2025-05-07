const producto = { 
  nombre: "Casaca Hypnotic Mujer Pipe",
  precioRegular: 129.0,
  precioOferta: 79.95,
  color: "Negro",
  modelo: "PR11646",
  cierre: "Cierre",
  material: "Poliéster",
  coleccion: "PV25",
  tipo: "Casaca",
  cuidados:
    "Lavar en agua fría, no usar secadora, no usar lejía, plancha tibia, lavar por separado.",
  imagen: "https://mamamountainperu.com/wp-content/uploads/abrigo-de-montana-y-nieve-impermeable-hombre-quechua-sh100-x-warm-_27_.webp"
};

const contenedor = document.getElementById("contenedor-producto");

contenedor.innerHTML = `
  <div class="producto-detalle">
    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
    <div class="producto-info">
      <h2 class="producto-nombre">${producto.nombre}</h2>
      <p><strong>Precio Regular:</strong> <del>S/ ${producto.precioRegular.toFixed(2)}</del></p>
      <p><strong>Precio Online:</strong> <span class="precio-oferta">S/ ${producto.precioOferta.toFixed(2)}</span></p>
      <p><strong>Color:</strong> ${producto.color}</p>
      <p><strong>Modelo:</strong> ${producto.modelo}</p>
      <p><strong>Cierre:</strong> ${producto.cierre}</p>
      <p><strong>Material:</strong> ${producto.material}</p>
      <p><strong>Colección:</strong> ${producto.coleccion}</p>
      <p><strong>Tipo:</strong> ${producto.tipo}</p>
      <p class="cuidados"><strong>Cuidados:</strong> ${producto.cuidados}</p>
    </div>
  </div>

  <div class="comentarios">
    <h3>Valora este producto</h3>
    <div class="estrellas" id="estrellas">
      <span data-valor="1">★</span>
      <span data-valor="2">★</span>
      <span data-valor="3">★</span>
      <span data-valor="4">★</span>
      <span data-valor="5">★</span>
    </div>
    <textarea id="comentario" placeholder="Escribe tu comentario aquí..."></textarea>
    <button class="enviar-comentario">Enviar</button>
    <div id="comentarios-lista"></div>
  </div>
`;

// ESTRELLAS
let estrellas = document.querySelectorAll("#estrellas span");
let valorSeleccionado = 0;

estrellas.forEach((estrella, index) => {
  estrella.addEventListener("click", () => {
    valorSeleccionado = index + 1;
    actualizarEstrellas();
  });
});

function actualizarEstrellas() {
  estrellas.forEach((estrella, index) => {
    estrella.classList.toggle("seleccionada", index < valorSeleccionado);
  });
}

// ENVIAR COMENTARIO
const btnComentario = document.querySelector(".enviar-comentario");
const comentarioInput = document.getElementById("comentario");
const comentariosLista = document.getElementById("comentarios-lista");

btnComentario.addEventListener("click", () => {
  const texto = comentarioInput.value.trim();

  if (texto.length === 0) {
    alert("Por favor escribe un comentario.");
    return;
  }

  const nuevoComentario = document.createElement("div");
  nuevoComentario.classList.add("comentario-usuario");
  nuevoComentario.innerHTML = `<strong>Usuario:</strong> ${texto}`;
  comentariosLista.appendChild(nuevoComentario);

  comentarioInput.value = "";
  valorSeleccionado = 0;
  actualizarEstrellas();
});

// ==========================
// FUNCIONALIDAD DEL MENÚ
// ==========================
function menuDeslizable() {
  const menu = document.getElementById("menuOpciones");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Preparado para filtrar por categoría (si usas productos en esta página)
function filtrarPorCategoria(categoria) {
  const productos = JSON.parse(localStorage.getItem("productos") || "[]");
  const filtrados = productos.filter(p => p.categoria === categoria);
  localStorage.setItem("productosFiltrados", JSON.stringify(filtrados));
  window.location.href = "index.html"; // Cambia esta línea según la página de productos
}
