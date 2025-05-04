function menuDeslizable() {
    const menu = document.getElementById("menuOpciones");
    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }
}

const productos = [
    { nombre: "Zapatillas Urbanas", categoria: "Calzado", imagen: "media/zapatillas.jpg", precio: 120 },
    { nombre: "Polera Casual", categoria: "Ropa", imagen: "media/polera.jpg", precio: 85 },
    { nombre: "Auriculares Bluetooth", categoria: "Electrónica", imagen: "media/auriculares.jpg", precio: 150 },
    { nombre: "Gorro de Lana", categoria: "Ropa", imagen: "media/gorro.jpg", precio: 25 },
    { nombre: "Smartwatch Fit", categoria: "Electrónica", imagen: "media/smartwatch.jpg", precio: 210 },
    { nombre: "Mochila Escolar", categoria: "Ropa", imagen: "media/mochila.jpg", precio: 65 },
    { nombre: "Sandalias Verano", categoria: "Calzado", imagen: "media/sandalias.jpg", precio: 35 },
    { nombre: "Camisa Formal", categoria: "Ropa", imagen: "media/camisa.jpg", precio: 95 },
    { nombre: "Mouse Inalámbrico", categoria: "Electrónica", imagen: "media/mouse.jpg", precio: 45 },
    { nombre: "Cargador Rápido", categoria: "Electrónica", imagen: "media/cargador.jpg", precio: 60 },
    { nombre: "Olla Arrocera", categoria: "Hogar", imagen: "media/olla.jpg", precio: 180 },
    { nombre: "Muñeca Bebé", categoria: "Juguetería", imagen: "media/muñeca.jpg", precio: 70 },
    { nombre: "Maquillaje Facial", categoria: "Belleza", imagen: "media/maquillaje.jpg", precio: 50 },
    { nombre: "Balón de Fútbol", categoria: "Deportes", imagen: "media/balon.jpg", precio: 70 },
    { nombre: "Libro de Cocina", categoria: "Libros", imagen: "media/libro.jpg", precio: 40 }
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
            window.location.href = "detalle_producto.html";
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