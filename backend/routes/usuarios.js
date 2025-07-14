const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarioController");

router.post("/registro", usuariosController.registrarUsuario);
router.post("/login", usuariosController.loginUsuario);
router.put("/:id_usuario/estado", usuariosController.cambiarEstadoUsuario);

module.exports = router;
