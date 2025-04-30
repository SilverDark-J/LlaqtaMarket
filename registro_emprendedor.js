function registrarEmprendedor() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const nombreEmprendimiento = document.getElementById("nombre_emprendimiento").value;
    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;
  
    if (!nombre || !apellido || !nombreEmprendimiento || !correo || !contraseña) {
      alert("Por favor, complete todos los campos.");
      return;
    }
  
    // Simulación de envío
    alert(`Emprendedor ${nombre} registrado correctamente.`);
  }
  