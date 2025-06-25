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

    const imagen_url = `/uploads/${id_emprendedor}/${req.file.filename}`;

    const sql = `
      INSERT INTO Producto (id_emprendedor, nombre, precio, descripcion, imagen_url)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await conexion.query(sql, [
      id_emprendedor,
      nombre,
      precio,
      descripcion,
      imagen_url,
    ]);

    res.status(201).json({
      mensaje: "Producto registrado",
      id_producto: result.insertId,
      imagen_url,
    });
  } catch (error) {
    console.error("Error al registrar producto:", error);
    res.status(500).json({ error: "Error al registrar el producto" });
  }
};
