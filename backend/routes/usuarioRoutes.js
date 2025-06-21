const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/registro", usuarioController.registrarUsuario);

module.exports = router;
