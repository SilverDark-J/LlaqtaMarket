const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/conexion");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
