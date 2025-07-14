const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Falta configurar JWT_SECRET en variables de entorno");
}

// Middleware general (ya lo tenías)
exports.verificarToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ mensaje: "Token mal formado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};

// Middleware específico: solo clientes
exports.verificarTokenCliente = (req, res, next) => {
  exports.verificarToken(req, res, () => {
    if (req.usuario.tipo_usuario !== "cliente") {
      return res
        .status(403)
        .json({ mensaje: "Acceso denegado: solo clientes" });
    }
    next();
  });
};

// Middleware específico: solo emprendedores
exports.verificarTokenEmprendedor = (req, res, next) => {
  exports.verificarToken(req, res, () => {
    if (req.usuario.tipo_usuario !== "emprendedor") {
      return res
        .status(403)
        .json({ mensaje: "Acceso denegado: solo emprendedores" });
    }
    next();
  });
};

// Middleware específico: solo administradores
exports.verificarTokenAdmin = (req, res, next) => {
  exports.verificarToken(req, res, () => {
    if (
      req.usuario.tipo_usuario !== "admin" &&
      req.usuario.tipo_usuario !== "administrador"
    ) {
      return res
        .status(403)
        .json({ mensaje: "Acceso denegado: solo administradores" });
    }
    next();
  });
};
