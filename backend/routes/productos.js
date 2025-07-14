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

router.get(
  "/:id_emprendedor",
  auth.verificarToken,
  productosController.listarProductosPorEmprendedor
);

// GET /api/productos -> Listar todos los productos disponibles públicamente
router.get("/", productosController.listarProductosPublicos);

// GET /api/productos/:id -> Obtener detalle de un producto
router.get("/detalle/:id", productosController.obtenerProductoPorId);


module.exports = router;
