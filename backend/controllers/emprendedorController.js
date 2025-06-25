// emprendedorController.js
const conexion = require("../db/conexion");
const bcrypt = require("bcrypt");

// Obtener datos del emprendedor
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

// Actualizar datos del emprendedor
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
      const sqlUsuario = `UPDATE Usuario SET nombres = ?, apellidos = ?, hash_contrasenia = ? WHERE id_usuario = ?`;
      await conexion.query(sqlUsuario, [nombres, apellidos, hash, id_usuario]);
    } else {
      const sqlUsuario = `UPDATE Usuario SET nombres = ?, apellidos = ? WHERE id_usuario = ?`;
      await conexion.query(sqlUsuario, [nombres, apellidos, id_usuario]);
    }

    const sqlEmprendedor = `
      UPDATE Emprendedor 
      SET telefono = ?, direccion = ?, descripcion = ?, categoria = ?, logo_url = ?
      WHERE id_usuario = ?
    `;
    await conexion.query(sqlEmprendedor, [
      telefono,
      direccion,
      descripcion,
      categoria,
      logo_url,
      id_usuario,
    ]);

    res.json({ mensaje: "Datos del emprendedor actualizados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
};
