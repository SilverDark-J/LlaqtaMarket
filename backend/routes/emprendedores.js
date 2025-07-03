const express = require("express");
const router = express.Router();
const emprendedorController = require("../controllers/emprendedorController");
const { verificarToken } = require("../middlewares/auth");

router.get("/", verificarToken, emprendedorController.obtenerEmprendedorPorId);
router.put("/", verificarToken, emprendedorController.actualizarEmprendedor);
router.get(
  "/todos",
  verificarToken,
  emprendedorController.listarTodosEmprendedores
);
router.get(
  "/admin/:id_emprendedor",
  verificarToken,
  emprendedorController.obtenerEmprendedorComoAdmin
);
router.put(
  "/admin/:id_emprendedor",
  verificarToken,
  emprendedorController.actualizarEmprendedorComoAdmin
);

module.exports = router;
