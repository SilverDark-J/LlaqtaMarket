const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv-flow").config();

require("./db/conexion");

const app = express();

// ❗ Solo para pruebas: permitir todos los orígenes
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

// Tus rutas
const usuariosRoutes = require("./routes/usuarios");
const clientesRoutes = require("./routes/clientes");
const emprendedoresRoutes = require("./routes/emprendedores");
const productosRouter = require("./routes/productos");

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/emprendedores", emprendedoresRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/productos", productosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
  console.log(`⚠️ CORS en modo desarrollo: se permite cualquier origen`);
});
