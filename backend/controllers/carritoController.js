const db = require("../db/conexion");

exports.obtenerCarritoPorCliente = async (req, res) => {
  const id_cliente = req.params.id;

  try {
    const [carrito] = await db.query(
      "SELECT * FROM Carrito WHERE id_cliente = ? ORDER BY fecha_creacion DESC LIMIT 1",
      [id_cliente]
    );

    if (carrito.length === 0) {
      const [nuevo] = await db.query(
        "INSERT INTO Carrito (id_cliente) VALUES (?)",
        [id_cliente]
      );
      return res.json({ id_carrito: nuevo.insertId, productos: [] });
    }

    const id_carrito = carrito[0].id_carrito;
    const [productos] = await db.query(
      `SELECT dc.id_detallecarrito, dc.id_producto, p.nombre, p.precio, dc.cantidad, dc.subtotal, p.imagen_url
       FROM DetalleCarrito dc
       JOIN Producto p ON dc.id_producto = p.id_producto
       WHERE dc.id_carrito = ?`,
      [id_carrito]
    );

    res.json({ ...carrito[0], productos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener el carrito" });
  }
};

exports.agregarAlCarrito = async (req, res) => {
  const { id_carrito, id_producto, cantidad } = req.body;

  try {
    const [[producto]] = await db.query(
      "SELECT precio FROM Producto WHERE id_producto = ?",
      [id_producto]
    );
    if (!producto)
      return res.status(404).json({ mensaje: "Producto no encontrado" });

    const subtotal = producto.precio * cantidad;

    const [[yaExiste]] = await db.query(
      "SELECT * FROM DetalleCarrito WHERE id_carrito = ? AND id_producto = ?",
      [id_carrito, id_producto]
    );

    if (yaExiste) {
      await db.query(
        `UPDATE DetalleCarrito 
         SET cantidad = cantidad + ?, subtotal = subtotal + ? 
         WHERE id_carrito = ? AND id_producto = ?`,
        [cantidad, subtotal, id_carrito, id_producto]
      );
    } else {
      await db.query(
        `INSERT INTO DetalleCarrito (id_carrito, id_producto, cantidad, subtotal)
         VALUES (?, ?, ?, ?)`,
        [id_carrito, id_producto, cantidad, subtotal]
      );
    }

    await db.query(
      `UPDATE Carrito 
       SET total = (SELECT SUM(subtotal) FROM DetalleCarrito WHERE id_carrito = ?) 
       WHERE id_carrito = ?`,
      [id_carrito, id_carrito]
    );

    res.json({ mensaje: "Producto agregado al carrito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al agregar producto al carrito" });
  }
};

exports.actualizarCantidad = async (req, res) => {
  const { id_carrito, id_producto, cantidad } = req.body;

  try {
    const [[producto]] = await db.query(
      "SELECT precio FROM Producto WHERE id_producto = ?",
      [id_producto]
    );
    if (!producto)
      return res.status(404).json({ mensaje: "Producto no encontrado" });

    const nuevoSubtotal = producto.precio * cantidad;

    await db.query(
      `UPDATE DetalleCarrito 
       SET cantidad = ?, subtotal = ?
       WHERE id_carrito = ? AND id_producto = ?`,
      [cantidad, nuevoSubtotal, id_carrito, id_producto]
    );

    await db.query(
      `UPDATE Carrito 
       SET total = (SELECT SUM(subtotal) FROM DetalleCarrito WHERE id_carrito = ?) 
       WHERE id_carrito = ?`,
      [id_carrito, id_carrito]
    );

    res.json({ mensaje: "Cantidad actualizada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al actualizar cantidad" });
  }
};

exports.eliminarProducto = async (req, res) => {
  const { id_carrito, id_producto } = req.params;

  try {
    await db.query(
      "DELETE FROM DetalleCarrito WHERE id_carrito = ? AND id_producto = ?",
      [id_carrito, id_producto]
    );

    await db.query(
      `UPDATE Carrito 
       SET total = (SELECT COALESCE(SUM(subtotal), 0) FROM DetalleCarrito WHERE id_carrito = ?) 
       WHERE id_carrito = ?`,
      [id_carrito, id_carrito]
    );

    res.json({ mensaje: "Producto eliminado del carrito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al eliminar producto del carrito" });
  }
};
