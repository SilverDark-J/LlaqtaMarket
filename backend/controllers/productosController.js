const conexion = require("../db/conexion");
const path = require("path");
const fs = require("fs");

exports.registrarProducto = async (req, res) => {
  try {
    const id_emprendedor = req.params.id_emprendedor;
    const { nombre, precio, descripcion, categoria } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Imagen no proporcionada" });
    }

    if (!categoria) {
      return res.status(400).json({ error: "Categoría no proporcionada" });
    }

    const imagen_url = `/uploads/${id_emprendedor}/${req.file.filename}`;

    // Insertar el producto
    const [productoResult] = await conexion.query(
      `INSERT INTO Producto (id_emprendedor, nombre, precio, descripcion, imagen_url)
       VALUES (?, ?, ?, ?, ?)`,
      [id_emprendedor, nombre, precio, descripcion, imagen_url]
    );

    const id_producto = productoResult.insertId;

    // Buscar id_categoria según el nombre de la categoría
    const [categoriaResult] = await conexion.query(
      `SELECT id_categoria FROM Categoria WHERE nombre_categoria = ?`,
      [categoria]
    );

    if (categoriaResult.length === 0) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    const id_categoria = categoriaResult[0].id_categoria;

    // Insertar relación producto-categoría
    await conexion.query(
      `INSERT INTO ProductoCategoria (id_producto, id_categoria) VALUES (?, ?)`,
      [id_producto, id_categoria]
    );

    res.status(201).json({
      mensaje: "Producto registrado",
      id_producto,
      imagen_url,
    });
  } catch (error) {
    console.error("Error al registrar producto:", error);
    res.status(500).json({ error: "Error al registrar el producto" });
  }
};

// Listar productos de un emprendedor
exports.listarProductosPorEmprendedor = async (req, res) => {
  const id_emprendedor = req.params.id_emprendedor;

  try {
    const [productos] = await conexion.query(
      `SELECT p.id_producto, p.nombre, p.precio, p.descripcion, 
              GROUP_CONCAT(c.nombre_categoria) AS categorias, p.imagen_url 
       FROM Producto p
       LEFT JOIN ProductoCategoria pc ON p.id_producto = pc.id_producto
       LEFT JOIN Categoria c ON pc.id_categoria = c.id_categoria
       WHERE p.id_emprendedor = ?
       GROUP BY p.id_producto`,
      [id_emprendedor]
    );

    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

///////////////////////// para index producto y producto_detalle
exports.listarProductosPublicos = async (req, res) => {
  try {
    const [productos] = await conexion.query(
      `SELECT p.id_producto, p.nombre, p.precio, p.descripcion,
              p.imagen_url, GROUP_CONCAT(c.nombre_categoria) AS categorias
       FROM Producto p
       LEFT JOIN ProductoCategoria pc ON p.id_producto = pc.id_producto
       LEFT JOIN Categoria c ON pc.id_categoria = c.id_categoria
       GROUP BY p.id_producto
       ORDER BY p.fecha_publicacion DESC`
    );
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos públicos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

exports.obtenerProductoPorId = async (req, res) => {
  const id_producto = req.params.id;
  try {
    const [[producto]] = await conexion.query(
      `SELECT p.id_producto, p.nombre, p.precio, p.descripcion, 
              p.imagen_url, e.nombre_emprendimiento, e.id_emprendedor,
              GROUP_CONCAT(c.nombre_categoria) AS categorias
       FROM Producto p
       LEFT JOIN ProductoCategoria pc ON p.id_producto = pc.id_producto
       LEFT JOIN Categoria c ON pc.id_categoria = c.id_categoria
       LEFT JOIN Emprendedor e ON p.id_emprendedor = e.id_emprendedor
       WHERE p.id_producto = ?
       GROUP BY p.id_producto`,
      [id_producto]
    );

    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
