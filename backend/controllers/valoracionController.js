const db = require("../db/conexion");

// GET: Obtener valoraciones de un producto
exports.obtenerPorProducto = async (req, res) => {
  const { id_producto } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT v.id_valoracion, v.nombre_cliente, v.comentario, v.puntuacion, v.fecha_comentario
      FROM Valoracion v
      WHERE v.id_producto = ?
      ORDER BY v.fecha_comentario DESC
    `,
      [id_producto]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener valoraciones", error });
  }
};

// POST: Crear valoración si ha comprado el producto
exports.crearValoracion = async (req, res) => {
  const id_cliente = req.usuario.id_usuario; // tomado del JWT
  const { id_producto, comentario, puntuacion } = req.body;

  try {
    // Verificar si compró el producto
    const [compras] = await db.query(
      `
      SELECT dp.id_producto
      FROM Pedido p
      JOIN DetallePedido dp ON dp.id_pedido = p.id_pedido
      WHERE p.id_cliente = (
        SELECT id_cliente FROM Cliente WHERE id_usuario = ?
      ) AND dp.id_producto = ? AND p.estado = 'confirmado'
    `,
      [id_cliente, id_producto]
    );

    if (compras.length === 0) {
      return res
        .status(403)
        .json({ mensaje: "Debes comprar el producto antes de valorarlo" });
    }

    // Verificar si ya comentó
    const [yaComentado] = await db.query(
      `
      SELECT * FROM Valoracion
      WHERE id_cliente = ? AND id_producto = ?
    `,
      [id_cliente, id_producto]
    );

    if (yaComentado.length > 0) {
      return res.status(400).json({ mensaje: "Ya has valorado este producto" });
    }

    // Obtener nombre del cliente
    const [cliente] = await db.query(
      `
      SELECT CONCAT(nombres, ' ', apellidos) AS nombre
      FROM Usuario WHERE id_usuario = ?
    `,
      [id_cliente]
    );

    const nombre_cliente = cliente[0]?.nombre || "Anónimo";

    // Insertar la valoración
    await db.query(
      `
      INSERT INTO Valoracion (id_cliente, id_producto, nombre_cliente, comentario, puntuacion)
      VALUES (?, ?, ?, ?, ?)
    `,
      [id_cliente, id_producto, nombre_cliente, comentario, puntuacion]
    );

    res.json({ mensaje: "¡Gracias por tu valoración!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al registrar la valoración", error });
  }
};
