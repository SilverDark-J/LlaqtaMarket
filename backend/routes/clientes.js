const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const { verificarToken } = require("../middlewares/auth");

router.get("/", verificarToken, clienteController.obtenerClientePorId);
router.put("/", verificarToken, clienteController.actualizarCliente);
router.get("/todos", verificarToken, clienteController.listarTodosClientes);
router.get(
  "/admin/:id_cliente",
  verificarToken,
  clienteController.obtenerClienteComoAdmin
);
router.put(
  "/admin/:id_cliente",
  verificarToken,
  clienteController.actualizarClienteComoAdmin
);

module.exports = router;
