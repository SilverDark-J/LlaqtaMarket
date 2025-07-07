// clienteController.js
const conexion = require("../db/conexion");
const bcrypt = require("bcrypt");

// Obtener datos del cliente
exports.obtenerClientePorId = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;

  const sql = `
    SELECT u.nombres, u.apellidos, u.correo, u.fecha_registro, c.direccion, c.telefono 
    FROM Usuario u 
    JOIN Cliente c ON u.id_usuario = c.id_usuario 
    WHERE u.id_usuario = ?
  `;

  try {
    const [results] = await conexion.query(sql, [id_usuario]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener datos del cliente" });
  }
};

// Actualizar datos del cliente
exports.actualizarCliente = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;
  const { nombres, apellidos, contrasenia, direccion, telefono } = req.body;

  try {
    if (contrasenia) {
      const hash = await bcrypt.hash(contrasenia, 10);
      const sqlUsuario = `UPDATE Usuario SET nombres = ?, apellidos = ?, hash_contrasenia = ? WHERE id_usuario = ?`;
      await conexion.query(sqlUsuario, [nombres, apellidos, hash, id_usuario]);
    } else {
      const sqlUsuario = `UPDATE Usuario SET nombres = ?, apellidos = ? WHERE id_usuario = ?`;
      await conexion.query(sqlUsuario, [nombres, apellidos, id_usuario]);
    }

    const sqlCliente = `UPDATE Cliente SET direccion = ?, telefono = ? WHERE id_usuario = ?`;
    await conexion.query(sqlCliente, [direccion, telefono, id_usuario]);

    res.json({ mensaje: "Datos del cliente actualizados correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
};

exports.listarTodosClientes = async (req, res) => {
  try {
    const sql = `
      SELECT c.id_cliente, u.nombres, u.apellidos, u.correo, c.telefono, u.fecha_registro
      FROM Cliente c
      JOIN Usuario u ON u.id_usuario = c.id_usuario
      WHERE u.estado_usuario != 'eliminado'
    `;
    const [clientes] = await conexion.query(sql);
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener clientes" });
  }
};

exports.obtenerClienteComoAdmin = async (req, res) => {
  const id_cliente = req.params.id_cliente;

  const sql = `
    SELECT c.id_cliente, u.nombres, u.apellidos, u.correo, c.direccion, c.telefono
    FROM Cliente c
    JOIN Usuario u ON u.id_usuario = c.id_usuario
    WHERE c.id_cliente = ?
  `;

  try {
    const [results] = await conexion.query(sql, [id_cliente]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener datos del cliente" });
  }
};

exports.actualizarClienteComoAdmin = async (req, res) => {
  const id_cliente = req.params.id_cliente;
  const { nombres, apellidos, correo, contrasenia, direccion, telefono } =
    req.body;

  try {
    // 1. Buscar el id_usuario relacionado al cliente
    const [[cliente]] = await conexion.query(
      `SELECT id_usuario FROM Cliente WHERE id_cliente = ?`,
      [id_cliente]
    );

    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const id_usuario = cliente.id_usuario;

    // 2. Verificar si el nuevo correo ya existe en otro usuario
    const [[correoExistente]] = await conexion.query(
      `SELECT id_usuario FROM Usuario WHERE correo = ? AND id_usuario != ?`,
      [correo, id_usuario]
    );

    if (correoExistente) {
      return res
        .status(400)
        .json({ error: "El correo ya está en uso por otro usuario" });
    }

    // 3. Actualizar datos en Usuario
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

    // 4. Actualizar datos en Cliente
    await conexion.query(
      `UPDATE Cliente SET direccion = ?, telefono = ? WHERE id_usuario = ?`,
      [direccion, telefono, id_usuario]
    );

    res.json({ mensaje: "Cliente actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};
