const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarioController");

// Registro
router.post("/registro", usuariosController.registrarUsuario);

// Login
router.post("/login", usuariosController.loginUsuario);

module.exports = router;
