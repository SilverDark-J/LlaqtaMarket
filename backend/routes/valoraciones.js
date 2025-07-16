const express = require("express");
const router = express.Router();
const valoracionController = require("../controllers/valoracionController");
const { verificarTokenCliente } = require("../middlewares/auth");

// Obtener valoraciones por producto
router.get("/:id_producto", valoracionController.obtenerPorProducto);

// Crear una nueva valoración
router.post("/", verificarTokenCliente, valoracionController.crearValoracion);

module.exports = router;
