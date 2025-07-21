// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();

// Esta es la línea de importación.
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser); // <-- Posiblemente la línea 10
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
