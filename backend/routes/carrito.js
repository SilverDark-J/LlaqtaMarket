const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");
const auth = require("../middlewares/auth");

// Obtener carrito por cliente autenticado
router.get(
  "/",
  auth.verificarTokenCliente,
  carritoController.obtenerCarritoPorCliente
);

// Agregar producto al carrito
router.post(
  "/agregar",
  auth.verificarTokenCliente,
  carritoController.agregarProductoAlCarrito
);

// Eliminar producto del carrito (requiere id_carrito y id_producto)
router.delete(
  "/:id_carrito/:id_producto",
  auth.verificarTokenCliente,
  carritoController.eliminarProductoDelCarrito
);

// ❌ Esta ruta está comentada porque no existe en el controller actual
// Si implementas la lógica para actualizar cantidad en el carrito, puedes descomentarla
/*
router.put(
  "/:id_detallecarrito",
  auth.verificarTokenCliente,
  carritoController.actualizarCantidad
);
*/

module.exports = router;
