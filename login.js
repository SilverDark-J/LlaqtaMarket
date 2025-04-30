document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();
  
    // Simulación de credenciales correctas
    const datosUsuario = {
      email: "cliente@llaqtamarket.com",
      password: "123456"
    };
  
    // Validación de campos vacíos
    if (!usuario || !contrasena) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    // Validación de formato de correo electrónico
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(usuario)) {
      alert('El correo electrónico no tiene un formato válido.');
      return;
    }
  
    // Validación de credenciales
    if (usuario !== datosUsuario.email && contrasena !== datosUsuario.password) {
      alert('Correo y contraseña incorrectos.');
    } else if (usuario !== datosUsuario.email) {
      alert('El correo electrónico es incorrecto.');
    } else if (contrasena !== datosUsuario.password) {
      alert('La contraseña es incorrecta.');
    } else {
      // Acceso correcto
      window.location.href = "index.html";
    }
  });
  