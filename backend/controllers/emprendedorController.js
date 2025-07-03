// emprendedorController.js
const conexion = require("../db/conexion");
const bcrypt = require("bcrypt");

// Obtener datos del emprendedor (desde el propio usuario logueado)
exports.obtenerEmprendedorPorId = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;

  const sql = `
    SELECT u.nombres, u.apellidos, u.correo, u.fecha_registro,
           e.nombre_emprendimiento, e.descripcion, e.categoria, 
           e.logo_url, e.telefono, e.direccion
    FROM Usuario u
    JOIN Emprendedor e ON u.id_usuario = e.id_usuario
    WHERE u.id_usuario = ?
  `;

  try {
    const [results] = await conexion.query(sql, [id_usuario]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Emprendedor no encontrado" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener datos del emprendedor" });
  }
};

// Actualizar emprendedor desde su propia sesión
exports.actualizarEmprendedor = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;
  const {
    nombres,
    apellidos,
    contrasenia,
    telefono,
    direccion,
    descripcion,
    categoria,
    logo_url,
  } = req.body;

  try {
    if (contrasenia) {
      const hash = await bcrypt.hash(contrasenia, 10);
      await conexion.query(
        `UPDATE Usuario SET nombres = ?, apellidos = ?, hash_contrasenia = ? WHERE id_usuario = ?`,
        [nombres, apellidos, hash, id_usuario]
      );
    } else {
      await conexion.query(
        `UPDATE Usuario SET nombres = ?, apellidos = ? WHERE id_usuario = ?`,
        [nombres, apellidos, id_usuario]
      );
    }

    await conexion.query(
      `UPDATE Emprendedor 
       SET telefono = ?, direccion = ?, descripcion = ?, categoria = ?, logo_url = ?
       WHERE id_usuario = ?`,
      [telefono, direccion, descripcion, categoria, logo_url, id_usuario]
    );

    res.json({ mensaje: "Datos del emprendedor actualizados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
};

// Obtener lista de todos los emprendedores (modo administrador)
exports.listarTodosEmprendedores = async (req, res) => {
  try {
    const sql = `
      SELECT e.id_emprendedor, u.nombres, u.apellidos, u.correo, 
             e.nombre_emprendimiento, e.telefono, u.fecha_registro
      FROM Emprendedor e
      JOIN Usuario u ON u.id_usuario = e.id_usuario
      WHERE u.estado_usuario != 'eliminado'
    `;
    const [emprendedores] = await conexion.query(sql);
    res.json(emprendedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener emprendedores" });
  }
};

// Obtener datos de un emprendedor por ID (modo administrador)
exports.obtenerEmprendedorComoAdmin = async (req, res) => {
  const id_emprendedor = req.params.id_emprendedor;

  const sql = `
    SELECT e.id_emprendedor, u.nombres, u.apellidos, u.correo,
           e.nombre_emprendimiento, e.descripcion, e.categoria,
           e.logo_url, e.telefono, e.direccion
    FROM Emprendedor e
    JOIN Usuario u ON u.id_usuario = e.id_usuario
    WHERE e.id_emprendedor = ?
  `;

  try {
    const [results] = await conexion.query(sql, [id_emprendedor]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Emprendedor no encontrado" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datos del emprendedor" });
  }
};

// Actualizar emprendedor desde el panel de administrador
exports.actualizarEmprendedorComoAdmin = async (req, res) => {
  const id_emprendedor = req.params.id_emprendedor;
  const {
    nombres,
    apellidos,
    correo,
    contrasenia,
    nombre_emprendimiento,
    telefono,
    direccion,
    descripcion,
    categoria,
    logo_url,
  } = req.body;

  try {
    // Obtener el id_usuario relacionado
    const [[row]] = await conexion.query(
      `SELECT id_usuario FROM Emprendedor WHERE id_emprendedor = ?`,
      [id_emprendedor]
    );

    if (!row) {
      return res.status(404).json({ error: "Emprendedor no encontrado" });
    }

    const id_usuario = row.id_usuario;

    // Actualizar datos del usuario
    if (contrasenia) {
      const hash = await bcrypt.hash(contrasenia, 10);
      await conexion.query(
        `UPDATE Usuario SET nombres = ?, apellidos = ?, correo = ?, hash_contrasenia = ? WHERE id_usuario = ?`,
        [nombres, apellidos, correo, hash, id_usuario]
      );
    } else {
      await conexion.query(
        `UPDATE Usuario SET nombres = ?, apellidos = ?, correo = ? WHERE id_usuario = ?`,
        [nombres, apellidos, correo, id_usuario]
      );
    }

    // Actualizar datos del emprendedor
    await conexion.query(
      `UPDATE Emprendedor 
       SET nombre_emprendimiento = ?, telefono = ?, direccion = ?, descripcion = ?, categoria = ?, logo_url = ?
       WHERE id_emprendedor = ?`,
      [
        nombre_emprendimiento,
        telefono,
        direccion,
        descripcion,
        categoria,
        logo_url,
        id_emprendedor,
      ]
    );

    res.json({ mensaje: "Emprendedor actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar emprendedor" });
  }
};
