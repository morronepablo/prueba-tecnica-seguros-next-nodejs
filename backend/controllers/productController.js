// backend/controllers/productController.js - VERSIÓN FINAL Y COMPLETA

const Product = require("../models/Product");

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = 8; // Productos por página
    const page = Number(req.query.page) || 1;
    const searchTerm = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i", // 'i' para no distinguir mayúsculas/minúsculas
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const count = await Product.countDocuments({ ...searchTerm, ...category });

    const products = await Product.find({ ...searchTerm, ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(`Error al obtener producto ${req.params.id}:`, error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Private/Admin

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Verificación robusta de la imagen
    if (!req.file) {
      return res.status(400).json({ message: "La imagen es obligatoria." });
    }
    if (!req.file.path) {
      return res.status(400).json({
        message: "Error en la subida de la imagen, no se recibió una URL.",
      });
    }

    const product = new Product({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      image: {
        public_id: req.file.filename,
        url: req.file.path,
      },
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("--- ERROR DEFINITIVO AL CREAR PRODUCTO ---");
    console.dir(error, { depth: null });
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price !== undefined ? Number(price) : product.price;
      product.stock = stock !== undefined ? Number(stock) : product.stock;
      product.category = category || product.category;

      // Si se sube una nueva imagen, la actualizamos
      if (req.file) {
        product.image = {
          public_id: req.file.filename,
          url: req.file.path,
        };
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(`Error al actualizar producto ${req.params.id}:`, error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// @desc    Borrar un producto
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Producto borrado exitosamente" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(`Error al borrar producto ${req.params.id}:`, error);
    res.status(500).json({ message: "Error al borrar el producto" });
  }
};

// Exportamos todas las funciones del controlador
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
