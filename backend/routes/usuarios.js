const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarioController");
const { verificarToken } = require("../middlewares/auth");

// Registro y login públicos
router.post("/registro", usuariosController.registrarUsuario);
router.post("/login", usuariosController.loginUsuario);

// A partir de aquí, protegemos las rutas
router.get("/cliente", verificarToken, usuariosController.obtenerUsuarioPorId);
router.put("/cliente", verificarToken, usuariosController.actualizarUsuario);

module.exports = router;
