document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevenir envío real
  
      const nombre = form.elements[0].value.trim();
      const apellido = form.elements[1].value.trim();
      const correo = form.elements[2].value.trim();
      const contraseña = form.elements[3].value.trim();
  
      if (!nombre || !apellido || !correo || !contraseña) {
        alert("Por favor, complete todos los campos.");
        return;
      }
  
      if (!validarCorreo(correo)) {
        alert("Ingrese un correo electrónico válido.");
        return;
      }
  
      if (contraseña.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
  
      alert("✅ Registro exitoso. ¡Bienvenido a LlaqtaMarket!");
      form.reset();
    });
  
    function validarCorreo(correo) {
      const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      return regex.test(correo);
    }
  });
  