const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reporteController");
const auth = require("../middlewares/auth");

router.get(
  "/mas-vendidos",
  auth.verificarTokenEmprendedor,
  reporteController.productosMasVendidos
);
router.get(
  "/sin-ventas",
  auth.verificarTokenEmprendedor,
  reporteController.productosSinVentas
);
router.get(
  "/total-generado",
  auth.verificarTokenEmprendedor,
  reporteController.totalGenerado
);
router.get(
  "/pedidos-con-productos",
  auth.verificarTokenEmprendedor,
  reporteController.cantidadPedidos
);
router.get(
  "/ventas-por-mes",
  auth.verificarTokenEmprendedor,
  reporteController.ventasPorMes
);

module.exports = router;
