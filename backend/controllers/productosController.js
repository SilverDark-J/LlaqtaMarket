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

    const [productoResult] = await conexion.query(
      `INSERT INTO Producto (id_emprendedor, nombre, precio, descripcion, imagen_url)
       VALUES (?, ?, ?, ?, ?)`,
      [id_emprendedor, nombre, precio, descripcion, imagen_url]
    );

    const id_producto = productoResult.insertId;

    const [categoriaResult] = await conexion.query(
      `SELECT id_categoria FROM Categoria WHERE nombre_categoria = ?`,
      [categoria]
    );

    if (categoriaResult.length === 0) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    const id_categoria = categoriaResult[0].id_categoria;

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

exports.actualizarProducto = async (req, res) => {
  const id_producto = req.params.id_producto;
  const { nombre, precio, descripcion, categoria } = req.body;

  try {
    let imagen_url = null;

    // Si se subió una nueva imagen
    if (req.file) {
      const rutaImagen = `/uploads/${req.file.filename}`;
      imagen_url = rutaImagen;

      // Actualizar también la imagen
      await conexion.query(
        `UPDATE Producto SET imagen_url = ? WHERE id_producto = ?`,
        [imagen_url, id_producto]
      );
    }

    await conexion.query(
      `UPDATE Producto
       SET nombre = ?, precio = ?, descripcion = ?
       WHERE id_producto = ?`,
      [nombre, precio, descripcion, id_producto]
    );

    // Verificar si la categoría existe
    const [categoriaResult] = await conexion.query(
      `SELECT id_categoria FROM Categoria WHERE nombre_categoria = ?`,
      [categoria]
    );

    if (categoriaResult.length === 0) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    const id_categoria = categoriaResult[0].id_categoria;

    // Eliminar categoría anterior (si existe) y asignar nueva
    await conexion.query(
      `DELETE FROM ProductoCategoria WHERE id_producto = ?`,
      [id_producto]
    );

    await conexion.query(
      `INSERT INTO ProductoCategoria (id_producto, id_categoria) VALUES (?, ?)`,
      [id_producto, id_categoria]
    );

    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

exports.eliminarProducto = async (req, res) => {
  const id_producto = req.params.id_producto;

  try {
    // Buscar ruta de la imagen
    const [[producto]] = await conexion.query(
      `SELECT imagen_url FROM Producto WHERE id_producto = ?`,
      [id_producto]
    );

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Eliminar de ProductoCategoria (por FK)
    await conexion.query(
      `DELETE FROM ProductoCategoria WHERE id_producto = ?`,
      [id_producto]
    );

    // Eliminar el producto
    await conexion.query(`DELETE FROM Producto WHERE id_producto = ?`, [
      id_producto,
    ]);

    // Eliminar archivo físico de imagen (opcional)
    const rutaImagen = path.join(
      __dirname,
      "..",
      "public",
      producto.imagen_url
    );
    if (fs.existsSync(rutaImagen)) {
      fs.unlinkSync(rutaImagen);
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

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

    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ error: "Error interno" });
  }
};
