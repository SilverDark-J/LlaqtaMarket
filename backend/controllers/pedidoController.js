const db = require("../db/conexion");

// Registrar un pedido a partir del carrito activo
exports.realizarPedido = async (req, res) => {
  try {
    const id_usuario = req.usuario?.id_usuario;
    const { nombre, dni, telefono, correo, metodo_pago } = req.body;

    // Verificar cliente
    const [[cliente]] = await db.query(
      "SELECT id_cliente FROM Cliente WHERE id_usuario = ?",
      [id_usuario]
    );
    if (!cliente)
      return res.status(404).json({ mensaje: "Cliente no encontrado" });

    const id_cliente = cliente.id_cliente;

    // Obtener carrito activo
    const [[carrito]] = await db.query(
      "SELECT * FROM Carrito WHERE id_cliente = ? AND estado = 'activo' ORDER BY fecha_creacion DESC LIMIT 1",
      [id_cliente]
    );

    if (!carrito)
      return res.status(400).json({ mensaje: "No hay carrito activo" });

    const id_carrito = carrito.id_carrito;

    // Obtener productos del carrito
    const [items] = await db.query(
      "SELECT id_producto, cantidad, subtotal FROM DetalleCarrito WHERE id_carrito = ?",
      [id_carrito]
    );
    if (items.length === 0)
      return res.status(400).json({ mensaje: "El carrito está vacío" });

    // Crear pedido
    const [pedidoResult] = await db.query(
      "INSERT INTO Pedido (id_cliente, total, estado) VALUES (?, ?, 'confirmado')",
      [id_cliente, carrito.total]
    );

    const id_pedido = pedidoResult.insertId;

    // Insertar cada producto en DetallePedido
    for (const item of items) {
      await db.query(
        "INSERT INTO DetallePedido (id_pedido, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)",
        [id_pedido, item.id_producto, item.cantidad, item.subtotal]
      );
    }

    // Marcar carrito como comprado
    await db.query(
      "UPDATE Carrito SET estado = 'comprado' WHERE id_carrito = ?",
      [id_carrito]
    );

    res.json({
      mensaje: "Pedido realizado con éxito",
      id_pedido,
      datos_cliente: { nombre, dni, telefono, correo, metodo_pago },
    });
  } catch (error) {
    console.error("❌ Error al procesar pedido:", error);
    res.status(500).json({ mensaje: "Error al procesar el pedido" });
  }
};

// Verificar si el cliente compró el producto hace máximo 7 días
exports.permiteComentar = async (req, res) => {
  try {
    const id_usuario = req.usuario?.id_usuario;
    const id_producto = req.params.id_producto;

    // Obtener id_cliente
    const [[cliente]] = await db.query(
      "SELECT id_cliente FROM Cliente WHERE id_usuario = ?",
      [id_usuario]
    );
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    const id_cliente = cliente.id_cliente;

    // Verificar si compró el producto en los últimos 7 días
    const [result] = await db.query(
      `SELECT dp.*
       FROM Pedido p
       JOIN DetallePedido dp ON dp.id_pedido = p.id_pedido
       WHERE p.id_cliente = ?
         AND dp.id_producto = ?
         AND p.estado = 'confirmado'
         AND p.fecha >= DATE_SUB(NOW(), INTERVAL 7 DAY)`,
      [id_cliente, id_producto]
    );

    const permitido = result.length > 0;
    return res.json({ permitido });
  } catch (error) {
    console.error("❌ Error al verificar permiso de comentario:", error);
    res.status(500).json({ mensaje: "Error al verificar permiso" });
  }
};
