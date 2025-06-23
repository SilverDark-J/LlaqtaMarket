const conexion = require("../db/conexion");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTRO
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

// LOGIN (ahora genera el JWT)
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

// Obtener datos de cliente (protegiendo la ruta con JWT)
exports.obtenerUsuarioPorId = (req, res) => {
  const id_usuario = req.usuario.id_usuario; // Extraído desde el token

  const sql = `
    SELECT u.nombres, u.apellidos, u.correo, u.fecha_registro, c.direccion, c.telefono 
    FROM Usuario u 
    JOIN Cliente c ON u.id_usuario = c.id_usuario 
    WHERE u.id_usuario = ?
  `;
  conexion.query(sql, [id_usuario], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener usuario" });
    if (results.length === 0)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(results[0]);
  });
};

// Actualizar datos de cliente (protegido por JWT)
exports.actualizarUsuario = async (req, res) => {
  const id_usuario = req.usuario.id_usuario; // Extraído del token

  const { nombres, apellidos, direccion, telefono, contrasenia } = req.body;

  try {
    if (contrasenia) {
      const hash = await bcrypt.hash(contrasenia, 10);
      const sqlUpdateUsuario = `UPDATE Usuario SET nombres = ?, apellidos = ?, hash_contrasenia = ? WHERE id_usuario = ?`;
      conexion.query(sqlUpdateUsuario, [nombres, apellidos, hash, id_usuario]);
    } else {
      const sqlUpdateUsuario = `UPDATE Usuario SET nombres = ?, apellidos = ? WHERE id_usuario = ?`;
      conexion.query(sqlUpdateUsuario, [nombres, apellidos, id_usuario]);
    }

    const sqlUpdateCliente = `UPDATE Cliente SET direccion = ?, telefono = ? WHERE id_usuario = ?`;
    conexion.query(sqlUpdateCliente, [direccion, telefono, id_usuario]);

    res.json({ mensaje: "Datos actualizados correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};
