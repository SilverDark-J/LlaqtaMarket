const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");
const auth = require("../middlewares/auth");

// Obtener carrito por cliente
router.get(
  "/:id",
  auth.verificarTokenCliente,
  carritoController.obtenerCarritoPorCliente
);

// Agregar producto al carrito
router.post(
  "/agregar",
  auth.verificarTokenCliente,
  carritoController.agregarAlCarrito
);

// Actualizar cantidad de un producto
router.put(
  "/actualizar",
  auth.verificarTokenCliente,
  carritoController.actualizarCantidad
);

// Eliminar producto del carrito
router.delete(
  "/eliminar/:id_carrito/:id_producto",
  auth.verificarTokenCliente,
  carritoController.eliminarProducto
);

module.exports = router;
