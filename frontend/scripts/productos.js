function menuDeslizable() {
    const menu = document.getElementById("menuOpciones");
    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }
}

const productos = [
    { nombre: "Zapatillas Urbanas", categoria: "Calzado", imagen: "productos/zapatillas_urbanas.png", precio: 120 },
    { nombre: "Polera Casual", categoria: "Ropa", imagen: "productos/polera_casual.jpg", precio: 85 },
    { nombre: "Auriculares Bluetooth", categoria: "Electrónica", imagen: "productos/auriculares.png", precio: 150 },
    { nombre: "Gorro de Lana", categoria: "Ropa", imagen: "productos/gorro_lana.jpg", precio: 25 },
    { nombre: "Smartwatch Fit", categoria: "Electrónica", imagen: "productos/smartwatch.jpg", precio: 210 },
    { nombre: "Mochila Escolar", categoria: "Ropa", imagen: "productos/mochila_escolar.jpg", precio: 65 },
    { nombre: "Sandalias Verano", categoria: "Calzado", imagen: "productos/sandalias_verano.jpg", precio: 35 },
    { nombre: "Camisa Formal", categoria: "Ropa", imagen: "productos/camisa_formal.jpg", precio: 95 },
    { nombre: "Mouse Inalámbrico", categoria: "Electrónica", imagen: "productos/mouse_inhalambrico.jpg", precio: 45 },
    { nombre: "Cargador Rápido", categoria: "Electrónica", imagen: "productos/cargador_rapido.jpg", precio: 60 },
    { nombre: "Olla Arrocera", categoria: "Hogar", imagen: "productos/olla_arrocera.jpg", precio: 180 },
    { nombre: "Muñeca Bebé", categoria: "Juguetería", imagen: "productos/muneca_bebe.jpg", precio: 70 },
    { nombre: "Maquillaje Facial", categoria: "Belleza", imagen: "productos/maquillaje_facial.jpg", precio: 50 },
    { nombre: "Balón de Fútbol", categoria: "Deportes", imagen: "productos/balon_futbol.jpg", precio: 70 },
    { nombre: "Libro de Cocina", categoria: "Libros", imagen: "productos/libro_cocina.jpg", precio: 40 }
];

const contenedor = document.getElementById("productosContainer");

function mostrarProductos(lista) {
    contenedor.innerHTML = "";  // Limpiamos el contenedor
    lista.forEach(prod => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h4>${prod.nombre}</h4>
            <p>${prod.categoria}</p>
            <strong>S/ ${prod.precio.toFixed(2)}</strong>
        `;
        div.onclick = () => {
            localStorage.setItem("productoSeleccionado", JSON.stringify(prod));
            window.location.href = "producto_detalle.html";
        };
        contenedor.appendChild(div);
    });
}

function filtrarProductos() {
    const texto = document.getElementById("busqueda").value.toLowerCase();
    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
}

function filtrarPorCategoria(cat) {
    const filtrados = productos.filter(p => p.categoria === cat);
    mostrarProductos(filtrados);
}

function mostrarTodos() {
    mostrarProductos(productos);
}

// Función para escuchar clics en categorías desde el menú
document.querySelectorAll('.menu-opciones a').forEach(item => {
    item.addEventListener('click', (e) => {
        filtrarPorCategoria(e.target.textContent);
    });
});

// Inicializar
mostrarProductos(productos);