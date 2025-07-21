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
  console.log("--- MIDDLEWARE ADMIN: Verificando permisos ---");

  if (req.user) {
    console.log("--- MIDDLEWARE ADMIN: req.user encontrado. ---");
    console.log("Valor de req.user:", req.user);
    console.log("Valor de req.user.role:", req.user.role);

    if (req.user.role === "admin") {
      console.log(
        "--- MIDDLEWARE ADMIN: ¡Permisos de admin correctos! Pasando al siguiente middleware. ---"
      );
      next(); // El usuario es admin, permite continuar
    } else {
      console.log(
        "--- MIDDLEWARE ADMIN: ERROR - El rol no es 'admin'. Bloqueando. ---"
      );
      res
        .status(401)
        .json({ message: "No autorizado, se requiere rol de administrador" });
    }
  } else {
    console.log(
      "--- MIDDLEWARE ADMIN: ERROR - req.user no existe. Bloqueando. ---"
    );
    res.status(401).json({ message: "No autorizado, usuario no encontrado" });
  }
};

module.exports = { protect, admin };
