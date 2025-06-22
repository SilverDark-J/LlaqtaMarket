const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarioController");

// Ruta de registro usuario (cliente o emprendedor)
router.post("/registro", usuariosController.registrarUsuario);

module.exports = router;
