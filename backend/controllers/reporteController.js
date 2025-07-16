const db = require("../db/conexion");

exports.productosMasVendidos = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;
  try {
    const [[{ id_emprendedor }]] = await db.query(
      "SELECT id_emprendedor FROM Emprendedor WHERE id_usuario = ?",
      [id_usuario]
    );

    const [resultados] = await db.query(
      `SELECT p.nombre, SUM(dp.cantidad) AS total_vendido
       FROM Producto p
       JOIN DetallePedido dp ON p.id_producto = dp.id_producto
       JOIN Pedido ped ON dp.id_pedido = ped.id_pedido
       WHERE p.id_emprendedor = ?
       GROUP BY p.id_producto
       ORDER BY total_vendido DESC`,
      [id_emprendedor]
    );

    res.json(resultados);
  } catch (error) {
    console.error("Error al obtener productos más vendidos", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.productosSinVentas = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;
  try {
    const [[{ id_emprendedor }]] = await db.query(
      "SELECT id_emprendedor FROM Emprendedor WHERE id_usuario = ?",
      [id_usuario]
    );

    const [resultados] = await db.query(
      `SELECT p.nombre
       FROM Producto p
       LEFT JOIN DetallePedido dp ON p.id_producto = dp.id_producto
       WHERE p.id_emprendedor = ? AND dp.id_producto IS NULL`,
      [id_emprendedor]
    );

    res.json(resultados);
  } catch (error) {
    console.error("Error al obtener productos sin ventas", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.totalGenerado = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;
  try {
    const [[{ id_emprendedor }]] = await db.query(
      "SELECT id_emprendedor FROM Emprendedor WHERE id_usuario = ?",
      [id_usuario]
    );

    const [resultados] = await db.query(
      `SELECT p.nombre, SUM(dp.subtotal) AS total_generado
       FROM Producto p
       JOIN DetallePedido dp ON p.id_producto = dp.id_producto
       WHERE p.id_emprendedor = ?
       GROUP BY p.id_producto
       ORDER BY total_generado DESC`,
      [id_emprendedor]
    );

    res.json(resultados);
  } catch (error) {
    console.error("Error al obtener total generado por producto", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.cantidadPedidos = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;
  try {
    const [[{ id_emprendedor }]] = await db.query(
      "SELECT id_emprendedor FROM Emprendedor WHERE id_usuario = ?",
      [id_usuario]
    );

    const [resultados] = await db.query(
      `SELECT COUNT(DISTINCT dp.id_pedido) AS cantidad_pedidos
       FROM DetallePedido dp
       JOIN Producto p ON dp.id_producto = p.id_producto
       WHERE p.id_emprendedor = ?`,
      [id_emprendedor]
    );

    res.json([resultados[0] || { cantidad_pedidos: 0 }]);
  } catch (error) {
    console.error("Error al obtener cantidad de pedidos", error);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.ventasPorMes = async (req, res) => {
  const id_usuario = req.usuario.id_usuario;
  try {
    const [[{ id_emprendedor }]] = await db.query(
      "SELECT id_emprendedor FROM Emprendedor WHERE id_usuario = ?",
      [id_usuario]
    );

    const [resultados] = await db.query(
      `SELECT DATE_FORMAT(ped.fecha, '%Y-%m') AS mes, SUM(dp.subtotal) AS total_mes
       FROM DetallePedido dp
       JOIN Producto p ON dp.id_producto = p.id_producto
       JOIN Pedido ped ON dp.id_pedido = ped.id_pedido
       WHERE p.id_emprendedor = ?
       GROUP BY mes
       ORDER BY mes DESC`,
      [id_emprendedor]
    );

    res.json(resultados);
  } catch (error) {
    console.error("Error al obtener ventas por mes", error);
    res.status(500).json({ error: "Error interno" });
  }
};
