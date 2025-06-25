const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configuración dinámica según id_emprendedor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const id_emprendedor = req.params.id_emprendedor;
    const uploadPath = path.join(__dirname, "..", "uploads", id_emprendedor);

    // Crea la carpeta si no existe
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

// 👇 👇 👇 Exportamos el objeto multer configurado
module.exports = upload;
