const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarioController");

// Registro y login públicos
router.post("/registro", usuariosController.registrarUsuario);
router.post("/login", usuariosController.loginUsuario);

module.exports = router;
