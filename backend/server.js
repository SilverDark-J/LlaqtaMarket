const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

// Servir el frontend (opcional, si quieres que Node sirva también el frontend)
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend")));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
