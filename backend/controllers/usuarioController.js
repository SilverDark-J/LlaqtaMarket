const conexion = require("../db/conexion");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
  const {
    nombres,
    apellidos,
    correo,
    contrasenia,
    tipo_usuario,
    nombre_emprendimiento,
    telefono,
    direccion,
  } = req.body;

  try {
    // Primero hasheamos la contraseña
    const hash_contrasenia = await bcrypt.hash(contrasenia, 10);

    // Insertamos en tabla Usuario
    const sqlUsuario = `
      INSERT INTO Usuario (nombres, apellidos, correo, hash_contrasenia, tipo_usuario, estado_usuario, fecha_registro)
      VALUES (?, ?, ?, ?, ?, 'activo', NOW())
    `;

    conexion.query(
      sqlUsuario,
      [nombres, apellidos, correo, hash_contrasenia, tipo_usuario],
      (err, result) => {
        if (err) {
          console.error("Error al insertar usuario:", err);
          return res.status(500).json({ error: "Error al registrar usuario" });
        }

        const id_usuario = result.insertId;

        if (tipo_usuario === "cliente") {
          const sqlCliente = `INSERT INTO Cliente (id_usuario, telefono, direccion) VALUES (?, ?, ?)`;
          conexion.query(sqlCliente, [
            id_usuario,
            telefono || null,
            direccion || null,
          ]);
        } else if (tipo_usuario === "emprendedor") {
          const sqlEmprendedor = `
          INSERT INTO Emprendedor (id_usuario, nombre_emprendimiento, descripcion, categoria, logo_url, telefono, direccion)
          VALUES (?, ?, null, null, null, ?, ?)
        `;
          conexion.query(sqlEmprendedor, [
            id_usuario,
            nombre_emprendimiento,
            telefono || null,
            direccion || null,
          ]);
        }

        return res
          .status(201)
          .json({ mensaje: "Usuario registrado correctamente" });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
