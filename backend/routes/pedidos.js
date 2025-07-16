const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const auth = require("../middlewares/auth");

// Ruta para registrar un pedido
router.post(
  "/pagar",
  auth.verificarTokenCliente,
  pedidoController.realizarPedido
);

module.exports = router;

router.get(
  "/permite-comentario/:id_producto",
  auth.verificarTokenCliente,
  pedidoController.permiteComentar
);
