// backend/controllers/statsController.js
const Product = require("../models/Product");
// En un futuro, importarías el modelo de Órdenes: const Order = require('../models/Order');

// @desc    Obtener estadísticas para el dashboard
// @route   GET /api/stats/summary
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // 1. Total de productos
    const totalProducts = await Product.countDocuments();

    // 2. Productos con bajo stock (ej. menos de 10 unidades)
    const lowStockProducts = await Product.countDocuments({
      stock: { $lte: 10 },
    });

    // 3. Ventas simuladas (mock data)
    // En una app real, esto vendría de una colección de 'Orders'
    const simulatedSales = {
      totalRevenue: 12500,
      totalOrders: 150,
      monthlySales: [
        { month: "Enero", sales: 1200 },
        { month: "Febrero", sales: 1800 },
        { month: "Marzo", sales: 1500 },
        { month: "Abril", sales: 2500 },
        { month: "Mayo", sales: 2200 },
        { month: "Junio", sales: 3300 },
      ],
    };

    res.json({
      totalProducts,
      lowStockProducts,
      sales: simulatedSales,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas del dashboard:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getDashboardStats,
};
