const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "No autorizado, token falló" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "No autorizado, no hay token" });
  }
};

const admin = (req, res, next) => {
  if (req.user) {
    if (req.user.role === "admin") {
      next(); // El usuario es admin, permite continuar
    } else {
      res
        .status(401)
        .json({ message: "No autorizado, se requiere rol de administrador" });
    }
  } else {
    res.status(401).json({ message: "No autorizado, usuario no encontrado" });
  }
};

module.exports = { protect, admin };
