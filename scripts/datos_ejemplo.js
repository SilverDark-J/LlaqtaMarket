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
  },
  {
    id_usuario: 3,
    nombres: "Carlos",
    apellidos: "Gómez",
    correo: "carlos@example.com",
    contrasenia: "clave789",
    direccion: "Jr. Arequipa 321",
    telefono: "901234567",
    fecha_registro: "2024-05-03"
  },
  {
    id_usuario: 4,
    nombres: "Ana",
    apellidos: "Torres",
    correo: "ana@example.com",
    contrasenia: "miClaveSegura",
    direccion: "Av. Los Olivos 888",
    telefono: "923456789",
    fecha_registro: "2024-05-04"
  },
  {
    id_usuario: 5,
    nombres: "Luis",
    apellidos: "Fernández",
    correo: "luis@example.com",
    contrasenia: "password123",
    direccion: "Calle Luna 101",
    telefono: "934567890",
    fecha_registro: "2024-05-05"
  },
  {
    id_usuario: 6,
    nombres: "María",
    apellidos: "Quispe",
    correo: "maria@example.com",
    contrasenia: "contrasenia2024",
    direccion: "Av. Perú 202",
    telefono: "945678901",
    fecha_registro: "2024-05-06"
  },
  {
    id_usuario: 7,
    nombres: "José",
    apellidos: "Sánchez",
    correo: "jose@example.com",
    contrasenia: "clave321",
    direccion: "Calle Mar 56",
    telefono: "956789012",
    fecha_registro: "2024-05-07"
  },
  {
    id_usuario: 8,
    nombres: "Elena",
    apellidos: "Mendoza",
    correo: "elena@example.com",
    contrasenia: "pass456",
    direccion: "Jr. Sol 777",
    telefono: "967890123",
    fecha_registro: "2024-05-08"
  },
  {
    id_usuario: 9,
    nombres: "Miguel",
    apellidos: "Rojas",
    correo: "miguel@example.com",
    contrasenia: "miclave123",
    direccion: "Av. Amazonas 33",
    telefono: "978901234",
    fecha_registro: "2024-05-09"
  },
  {
    id_usuario: 10,
    nombres: "Camila",
    apellidos: "Zapata",
    correo: "camila@example.com",
    contrasenia: "segura2024",
    direccion: "Calle Central 19",
    telefono: "989012345",
    fecha_registro: "2024-05-10"
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
  