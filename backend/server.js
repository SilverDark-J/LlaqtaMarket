const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Importamos rutas
const usuarioRoutes = require("./routes/usuarioRoutes");
app.use("/api", usuarioRoutes);

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
