const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const { verificarToken } = require("../middlewares/auth");

router.get("/", verificarToken, clienteController.obtenerClientePorId);
router.put("/", verificarToken, clienteController.actualizarCliente);

module.exports = router;
