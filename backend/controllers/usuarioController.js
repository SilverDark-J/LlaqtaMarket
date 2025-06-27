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

    const [result] = await conexion.query(sqlUsuario, [
      nombres,
      apellidos,
      correo,
      hash_contrasenia,
      tipo_usuario,
    ]);

    const id_usuario = result.insertId;

    if (tipo_usuario === "cliente") {
      const sqlCliente = `INSERT INTO Cliente (id_usuario, telefono, direccion) VALUES (?, ?, ?)`;
      await conexion.query(sqlCliente, [
        id_usuario,
        telefono || null,
        direccion || null,
      ]);
    } else if (tipo_usuario === "emprendedor") {
      const sqlEmprendedor = `
        INSERT INTO Emprendedor (id_usuario, nombre_emprendimiento, descripcion, categoria, logo_url, telefono, direccion)
        VALUES (?, ?, null, null, null, ?, ?)
      `;
      await conexion.query(sqlEmprendedor, [
        id_usuario,
        nombre_emprendimiento,
        telefono || null,
        direccion || null,
      ]);
    }

    return res
      .status(201)
      .json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

// Login general (para todos los usuarios)
exports.loginUsuario = async (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res.status(400).json({ mensaje: "Campos incompletos" });
  }

  try {
    const [resultados] = await conexion.query(
      `SELECT * FROM Usuario WHERE correo = ?`,
      [correo]
    );

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

    let payload = {
      id_usuario: usuario.id_usuario,
      tipo_usuario: usuario.tipo_usuario,
    };

    if (usuario.tipo_usuario === "emprendedor") {
      const [emprendedorData] = await conexion.query(
        `SELECT id_emprendedor FROM Emprendedor WHERE id_usuario = ?`,
        [usuario.id_usuario]
      );

      if (emprendedorData.length > 0) {
        payload.id_emprendedor = emprendedorData[0].id_emprendedor;
      }
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      tipo_usuario: usuario.tipo_usuario,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
