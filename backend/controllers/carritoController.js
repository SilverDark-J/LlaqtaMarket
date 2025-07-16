const db = require("../db/conexion");

// Obtener el carrito actual de un cliente
exports.obtenerCarritoPorCliente = async (req, res) => {
  try {
    const id_usuario = req.usuario?.id_usuario || req.params.id; // fallback a params si no hay auth

    const [[cliente]] = await db.query(
      "SELECT id_cliente FROM Cliente WHERE id_usuario = ?",
      [id_usuario]
    );
    if (!cliente)
      return res.status(404).json({ mensaje: "Cliente no encontrado" });

    const id_cliente = cliente.id_cliente;

    // Buscar carrito activo
    const [carrito] = await db.query(
      "SELECT * FROM Carrito WHERE id_cliente = ? AND estado = 'activo' ORDER BY fecha_creacion DESC LIMIT 1",
      [id_cliente]
    );

    let id_carrito;

    if (carrito.length === 0) {
      // Crear nuevo carrito activo
      const [nuevo] = await db.query(
        "INSERT INTO Carrito (id_cliente, estado) VALUES (?, 'activo')",
        [id_cliente]
      );
      id_carrito = nuevo.insertId;
    } else {
      id_carrito = carrito[0].id_carrito;
    }

    const [productos] = await db.query(
      `SELECT dc.id_detallecarrito, dc.id_producto, p.nombre, p.precio, dc.cantidad, dc.subtotal, p.imagen_url
       FROM DetalleCarrito dc
       JOIN Producto p ON dc.id_producto = p.id_producto
       WHERE dc.id_carrito = ?`,
      [id_carrito]
    );

    const [[{ total }]] = await db.query(
      "SELECT total FROM Carrito WHERE id_carrito = ?",
      [id_carrito]
    );

    res.json({ id_carrito, total, productos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el carrito" });
  }
};

// Agregar producto al carrito
exports.agregarProductoAlCarrito = async (req, res) => {
  try {
    const { id_producto, cantidad } = req.body;
    if (!id_producto || !cantidad || cantidad <= 0) {
      return res.status(400).json({ mensaje: "Datos inválidos" });
    }

    const id_usuario = req.usuario?.id_usuario || req.body.id_usuario;

    const [[cliente]] = await db.query(
      "SELECT id_cliente FROM Cliente WHERE id_usuario = ?",
      [id_usuario]
    );
    if (!cliente)
      return res.status(404).json({ mensaje: "Cliente no encontrado" });

    const id_cliente = cliente.id_cliente;

    // Obtener carrito activo
    const [carrito] = await db.query(
      "SELECT * FROM Carrito WHERE id_cliente = ? AND estado = 'activo' ORDER BY fecha_creacion DESC LIMIT 1",
      [id_cliente]
    );

    let id_carrito;

    if (carrito.length === 0) {
      const [nuevo] = await db.query(
        "INSERT INTO Carrito (id_cliente, estado) VALUES (?, 'activo')",
        [id_cliente]
      );
      id_carrito = nuevo.insertId;
    } else {
      id_carrito = carrito[0].id_carrito;
    }

    // Obtener precio del producto
    const [[producto]] = await db.query(
      "SELECT precio FROM Producto WHERE id_producto = ?",
      [id_producto]
    );
    if (!producto)
      return res.status(404).json({ mensaje: "Producto no encontrado" });

    const subtotal = producto.precio * cantidad;

    // Verificar si el producto ya está en el carrito
    const [[existe]] = await db.query(
      "SELECT id_detallecarrito, cantidad FROM DetalleCarrito WHERE id_carrito = ? AND id_producto = ?",
      [id_carrito, id_producto]
    );

    if (existe) {
      const nuevaCantidad = existe.cantidad + cantidad;
      const nuevoSubtotal = producto.precio * nuevaCantidad;

      await db.query(
        "UPDATE DetalleCarrito SET cantidad = ?, subtotal = ? WHERE id_detallecarrito = ?",
        [nuevaCantidad, nuevoSubtotal, existe.id_detallecarrito]
      );
    } else {
      await db.query(
        "INSERT INTO DetalleCarrito (id_carrito, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)",
        [id_carrito, id_producto, cantidad, subtotal]
      );
    }

    // Actualizar total del carrito
    await db.query(
      `UPDATE Carrito SET total = (
        SELECT IFNULL(SUM(subtotal), 0) FROM DetalleCarrito WHERE id_carrito = ?
      ) WHERE id_carrito = ?`,
      [id_carrito, id_carrito]
    );

    res
      .status(201)
      .json({ mensaje: "Producto agregado al carrito", id_carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar producto al carrito" });
  }
};

// Eliminar un producto del carrito
exports.eliminarProductoDelCarrito = async (req, res) => {
  try {
    const { id_carrito, id_producto } = req.params;

    // Verificar existencia del producto
    const [[detalle]] = await db.query(
      "SELECT id_detallecarrito FROM DetalleCarrito WHERE id_carrito = ? AND id_producto = ?",
      [id_carrito, id_producto]
    );

    if (!detalle)
      return res
        .status(404)
        .json({ mensaje: "Producto no encontrado en el carrito" });

    // Eliminar producto
    await db.query(
      "DELETE FROM DetalleCarrito WHERE id_carrito = ? AND id_producto = ?",
      [id_carrito, id_producto]
    );

    // Actualizar total
    await db.query(
      `UPDATE Carrito SET total = (
        SELECT IFNULL(SUM(subtotal), 0) FROM DetalleCarrito WHERE id_carrito = ?
      ) WHERE id_carrito = ?`,
      [id_carrito, id_carrito]
    );

    res.json({ mensaje: "Producto eliminado del carrito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar producto del carrito" });
  }
};

// Actualizar la cantidad de un producto en el carrito
exports.actualizarCantidadProducto = async (req, res) => {
  try {
    const { id_detallecarrito, cantidad } = req.body;

    if (!id_detallecarrito || !cantidad || cantidad <= 0) {
      return res.status(400).json({ mensaje: "Datos inválidos" });
    }

    // Obtener el precio del producto
    const [[detalle]] = await db.query(
      `SELECT dc.id_producto, p.precio, dc.id_carrito
       FROM DetalleCarrito dc
       JOIN Producto p ON dc.id_producto = p.id_producto
       WHERE dc.id_detallecarrito = ?`,
      [id_detallecarrito]
    );

    if (!detalle) {
      return res.status(404).json({ mensaje: "Detalle no encontrado" });
    }

    const nuevoSubtotal = detalle.precio * cantidad;

    // Actualizar detalle
    await db.query(
      `UPDATE DetalleCarrito 
       SET cantidad = ?, subtotal = ? 
       WHERE id_detallecarrito = ?`,
      [cantidad, nuevoSubtotal, id_detallecarrito]
    );

    // Actualizar total del carrito
    await db.query(
      `UPDATE Carrito SET total = (
        SELECT IFNULL(SUM(subtotal), 0)
        FROM DetalleCarrito
        WHERE id_carrito = ?
      ) WHERE id_carrito = ?`,
      [detalle.id_carrito, detalle.id_carrito]
    );

    res.json({ mensaje: "Cantidad actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar cantidad" });
  }
};

// Vaciar completamente el carrito activo
exports.vaciarCarrito = async (req, res) => {
  try {
    const id_usuario = req.usuario?.id_usuario;

    const [[cliente]] = await db.query(
      "SELECT id_cliente FROM Cliente WHERE id_usuario = ?",
      [id_usuario]
    );
    if (!cliente)
      return res.status(404).json({ mensaje: "Cliente no encontrado" });

    const id_cliente = cliente.id_cliente;

    const [[carrito]] = await db.query(
      `SELECT id_carrito FROM Carrito 
       WHERE id_cliente = ? AND estado = 'activo' 
       ORDER BY fecha_creacion DESC LIMIT 1`,
      [id_cliente]
    );

    if (!carrito)
      return res.status(404).json({ mensaje: "No hay carrito activo" });

    await db.query("DELETE FROM DetalleCarrito WHERE id_carrito = ?", [
      carrito.id_carrito,
    ]);

    await db.query("UPDATE Carrito SET total = 0 WHERE id_carrito = ?", [
      carrito.id_carrito,
    ]);

    res.json({ mensaje: "Carrito vaciado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al vaciar el carrito" });
  }
};
