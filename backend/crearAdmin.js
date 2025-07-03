const bcrypt = require("bcrypt");
const conexion = require("./db/conexion"); // ya es un pool con promesas

async function crearAdmin() {
  const nombres = "admin1";
  const apellidos = "";
  const dni = null;
  const correo = "admin1@a.a";
  const contrasenia = "Admin1.";
  const tipo_usuario = "administrador";

  try {
    const hash_contrasenia = await bcrypt.hash(contrasenia, 10);

    const [resultadoUsuario] = await conexion.query(
      `INSERT INTO Usuario (nombres, apellidos, dni, correo, hash_contrasenia, tipo_usuario)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombres, apellidos, dni, correo, hash_contrasenia, tipo_usuario]
    );

    const id_usuario = resultadoUsuario.insertId;

    await conexion.query(
      `INSERT INTO Administrador (id_usuario)
       VALUES (?)`,
      [id_usuario]
    );

    console.log("Administrador creado con éxito. ID:", id_usuario);
  } catch (error) {
    console.error("Error al crear el administrador:", error);
  } finally {
    // No cerrar pool aquí, se mantiene vivo para el resto de la app
    // conexion.end();
  }
}

crearAdmin();
