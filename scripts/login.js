document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const contrasena = document.getElementById('contrasena').value.trim();

  // Simulación de base de datos con contraseñas que cumplen con las reglas de validación
  const usuarios = [
    { tipo: 'usuario', email: 'cliente@llaqtamarket.com', password: 'Cliente123.' },
    { tipo: 'emprendedor', email: 'emprendedor@llaqtamarket.com', password: 'Emprende123.' }
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

  // Si todo es correcto, redirigir según el tipo de usuario
  if (cuenta.tipo === 'usuario') {
    window.location.href = 'index.html';
  } else if (cuenta.tipo === 'emprendedor') {
    window.location.href = 'index.html';
  }
});
