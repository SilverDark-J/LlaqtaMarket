const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const productosController = require("../controllers/productosController");

router.post(
  "/:id_emprendedor",
  auth.verificarToken,
  upload.single("imagenProducto"),
  productosController.registrarProducto
);

router.put(
  "/:id_producto",
  auth.verificarToken,
  upload.single("imagenProducto"),
  productosController.actualizarProducto
);

router.delete(
  "/:id_producto",
  auth.verificarToken,
  productosController.eliminarProducto // ✅ NUEVO
);

router.get(
  "/:id_emprendedor",
  auth.verificarToken,
  productosController.listarProductosPorEmprendedor
);

router.get("/", productosController.listarProductosPublicos);

router.get("/detalle/:id", productosController.obtenerProductoPorId);

module.exports = router;
