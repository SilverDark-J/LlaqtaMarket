// Datos de ejemplo para usuarios
const usuariosEjemplo = [
  {
    id_usuario: 1,
    nombres: "Juan",
    apellidos: "Pérez",
    correo: "juan@example.com",
    contrasenia: "contraseña123",
    direccion: "Av. Lima 123",
    telefono: "987654321",
    fecha_registro: "2024-05-01"
  },
  {
    id_usuario: 2,
    nombres: "Lucía",
    apellidos: "Ramírez",
    correo: "lucia@example.com",
    contrasenia: "contraseña456",
    direccion: "Calle Sol 456",
    telefono: "912345678",
    fecha_registro: "2024-05-02"
  }
];

  
  // Datos de ejemplo para emprendedores
  const emprendedoresEjemplo = [
    {
      nombre: "Carlos",
      apellido: "Gómez",
      correo: "carlos@emprende.com",
      telefono: "989898989",
      direccion: "Pasaje Comercio 12",
      descripcion: "Venta de productos orgánicos",
      nombreEmprendimiento: "EcoMarket"
    },
    {
      nombre: "María",
      apellido: "Lozano",
      correo: "maria@tienda.com",
      telefono: "999888777",
      direccion: "Av. Central 45",
      descripcion: "Artesanías hechas a mano",
      nombreEmprendimiento: "Manos Peruanas"
    }
  ];
  
  // Datos de ejemplo para pedidos
  const pedidosEjemplo = [
    {
      id: 101,
      usuarioId: 1,
      fecha: "2025-05-01",
      total: 75.50,
      productos: [
        { nombre: "Mermelada", cantidad: 2, precio: 20 },
        { nombre: "Pan integral", cantidad: 1, precio: 35.50 }
      ]
    },
    {
      id: 102,
      usuarioId: 2,
      fecha: "2025-05-02",
      total: 60.00,
      productos: [
        { nombre: "Pulsera artesanal", cantidad: 1, precio: 30 },
        { nombre: "Cuaderno reciclado", cantidad: 2, precio: 15 }
      ]
    }
  ];
  
  // Guardar en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuariosEjemplo));
  localStorage.setItem("emprendedores", JSON.stringify(emprendedoresEjemplo));
  localStorage.setItem("pedidos", JSON.stringify(pedidosEjemplo));
  
  console.log("✅ Datos de ejemplo guardados en localStorage.");
  