const conexion = require("../db/conexion");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registro general
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
    const hash_contrasenia = await bcrypt.hash(contrasenia, 10);

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

        // Según el tipo de usuario creamos registros en tablas hijas:
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

// Login general (para todos los usuarios)
exports.loginUsuario = (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res.status(400).json({ mensaje: "Campos incompletos" });
  }

  const sql = `SELECT * FROM Usuario WHERE correo = ?`;

  conexion.query(sql, [correo], async (err, resultados) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ mensaje: "Error en el servidor" });
    }

    if (resultados.length === 0) {
      return res.status(401).json({ mensaje: "Correo no registrado" });
    }

    const usuario = resultados[0];
    const passwordCorrecta = await bcrypt.compare(
      contrasenia,
      usuario.hash_contrasenia
    );
    if (!passwordCorrecta) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Generamos el token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, tipo_usuario: usuario.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      tipo_usuario: usuario.tipo_usuario,
    });
  });
};
