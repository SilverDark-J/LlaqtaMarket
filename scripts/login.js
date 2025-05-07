document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const contrasena = document.getElementById('contrasena').value.trim();

  // Simulación de base de datos con contraseñas que cumplen con las reglas de validación
  const usuarios = [
    { tipo: 'usuario', email: 'cliente@llaqtamarket.com', password: 'Cliente123.' },
    { tipo: 'emprendedor', email: 'emprendedor@llaqtamarket.com', password: 'Emprende123.' },
    { tipo: 'admin', email: 'admin@llaqtamarket.com', password: 'Admin123.' }
  ];

  // Validaciones básicas
  if (!usuario || !contrasena) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoValido.test(usuario)) {
    alert('El correo electrónico no tiene un formato válido.');
    return;
  }

  // Verificación de credenciales
  const cuenta = usuarios.find(u => u.email === usuario);

  if (!cuenta) {
    alert('El correo electrónico no está registrado.');
    return;
  }

  // Comparar la contraseña con la almacenada
  if (cuenta.password !== contrasena) {
    alert('La contraseña es incorrecta.');
    return;
  }

  // Redirección según tipo de usuario
  switch (cuenta.tipo) {
    case 'usuario':
      window.location.href = 'productos.html';
      break;
    case 'emprendedor':
      window.location.href = 'panel_emprendedor.html';
      break;
    case 'admin':
      window.location.href = 'panel_admin.html';
      break;
    default:
      alert('Tipo de usuario no reconocido.');
  }
});
