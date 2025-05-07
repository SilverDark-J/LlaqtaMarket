document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir envío real

    const nombre = form.elements[0].value.trim();
    const apellido = form.elements[1].value.trim();
    const correo = form.elements[2].value.trim();
    const contraseña = form.elements[3].value.trim();

    // Validación de nombre y apellido (mínimo 3 caracteres)
    if (!nombre || nombre.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (!apellido || apellido.length < 3) {
      alert("El apellido debe tener al menos 3 caracteres.");
      return;
    }

    // Validación de correo
    if (!correo || !validarCorreo(correo)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    // Validación de contraseña (mínimo 8 caracteres, debe tener letras, números y uno de los caracteres especiales permitidos)
    if (!contraseña || contraseña.length < 8 || !validarContraseña(contraseña)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluir letras, números y uno de los siguientes caracteres especiales: punto, coma, guion o guion bajo.");
      return;
    }

    alert("✅ Registro exitoso. ¡Bienvenido a LlaqtaMarket!");
    form.reset();
  });

  // Función para validar correo
  function validarCorreo(correo) {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(correo);
  }

  // Función para validar la contraseña
  function validarContraseña(contraseña) {
    // La contraseña debe tener al menos una letra, al menos un número, y uno de los siguientes caracteres especiales: punto, coma, guion o guion bajo
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
    return regex.test(contraseña);
  }
});
