// backend/routes/statsRoutes.js
const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/statsController");
const { protect, admin } = require("../middleware/authMiddleware");

// Definimos la ruta para obtener el resumen de estadísticas
router.get("/summary", protect, admin, getDashboardStats);

module.exports = router;
