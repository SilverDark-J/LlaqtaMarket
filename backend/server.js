const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./db/conexion");

const app = express();
app.use(cors());
app.use(express.json());

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
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
