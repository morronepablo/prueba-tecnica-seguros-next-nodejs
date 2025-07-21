// backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

const upload = require("../config/cloudinary");

// --- DEFINICIÓN DE RUTAS ---

// Ruta para obtener todos los productos y para crear un nuevo producto
router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);

// Ruta para obtener, actualizar y borrar un producto específico por su ID
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.single("image"), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
