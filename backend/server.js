const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv-flow").config();
require("./db/conexion");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

const usuariosRoutes = require("./routes/usuarios");
const clientesRoutes = require("./routes/clientes");
const emprendedoresRoutes = require("./routes/emprendedores");
const productosRouter = require("./routes/productos");
const carritoRouter = require("./routes/carrito");
const pedidosRoutes = require("./routes/pedidos"); // ✅ Aquí estaba tu módulo de pedidos
const reportesRoutes = require("./routes/reportes");

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/emprendedores", emprendedoresRoutes);
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
app.use("/api/pedidos", pedidosRoutes); // ✅ AGREGA ESTA LÍNEA
app.use("/api/reportes", reportesRoutes); // ✅ Agregado

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
  console.log(`⚠️ CORS en modo desarrollo: se permite cualquier origen`);
});
