const express = require("express");
const router = express.Router();
const emprendedorController = require("../controllers/emprendedorController");
const { verificarToken } = require("../middlewares/auth");

router.get("/", verificarToken, emprendedorController.obtenerEmprendedorPorId);
router.put("/", verificarToken, emprendedorController.actualizarEmprendedor);

module.exports = router;
