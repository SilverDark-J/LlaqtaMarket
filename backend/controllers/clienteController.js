const conexion = require("../db/conexion");
const bcrypt = require("bcrypt");

// Obtener datos del cliente
exports.obtenerClientePorId = (req, res) => {
  const id_usuario = req.usuario.id_usuario;

  const sql = `
    SELECT u.nombres, u.apellidos, u.correo, u.fecha_registro, c.direccion, c.telefono 
    FROM Usuario u 
    JOIN Cliente c ON u.id_usuario = c.id_usuario 
    WHERE u.id_usuario = ?
  `;

  conexion.query(sql, [id_usuario], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al obtener datos del cliente" });
    if (results.length === 0)
      return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(results[0]);
  });
};

// Actualizar datos del cliente
exports.actualizarCliente = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;
  const { nombres, apellidos, contrasenia, direccion, telefono } = req.body;

  try {
    if (contrasenia) {
      const hash = await bcrypt.hash(contrasenia, 10);
      const sqlUsuario = `UPDATE Usuario SET nombres = ?, apellidos = ?, hash_contrasenia = ? WHERE id_usuario = ?`;
      conexion.query(sqlUsuario, [nombres, apellidos, hash, id_usuario]);
    } else {
      const sqlUsuario = `UPDATE Usuario SET nombres = ?, apellidos = ? WHERE id_usuario = ?`;
      conexion.query(sqlUsuario, [nombres, apellidos, id_usuario]);
    }

    const sqlCliente = `UPDATE Cliente SET direccion = ?, telefono = ? WHERE id_usuario = ?`;
    conexion.query(sqlCliente, [direccion, telefono, id_usuario]);

    res.json({ mensaje: "Datos del cliente actualizados correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
};
