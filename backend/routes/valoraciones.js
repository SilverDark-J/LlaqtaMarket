const express = require("express");
const router = express.Router();
const valoracionController = require("../controllers/valoracionController");
const { verificarTokenCliente } = require("../middlewares/auth");

// Obtener valoraciones por producto
router.get("/:id_producto", valoracionController.obtenerPorProducto);

// Crear una nueva valoración
router.post("/", verificarTokenCliente, valoracionController.crearValoracion);

router.get(
  "/permite-comentario/:id_producto",
  verificarTokenCliente,
  async (req, res) => {
    const id_usuario = req.usuario.id_usuario;
    const id_producto = req.params.id_producto;

    try {
      const [rows] = await db.query(
        `
      SELECT p.fecha
      FROM Pedido p
      JOIN DetallePedido dp ON p.id_pedido = dp.id_pedido
      WHERE p.id_cliente = (SELECT id_cliente FROM Cliente WHERE id_usuario = ?)
        AND dp.id_producto = ?
        AND p.estado = 'confirmado'
      ORDER BY p.fecha DESC
      LIMIT 1
    `,
        [id_usuario, id_producto]
      );

      if (rows.length === 0) {
        return res.json({ permitido: false });
      }

      const fechaCompra = new Date(rows[0].fecha);
      const unaSemanaDespues = new Date(fechaCompra);
      unaSemanaDespues.setDate(unaSemanaDespues.getDate() + 7);

      const hoy = new Date();
      const permitido = hoy <= unaSemanaDespues;

      res.json({ permitido });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Error al verificar permiso para comentar" });
    }
  }
);

module.exports = router;
