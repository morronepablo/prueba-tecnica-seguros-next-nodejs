require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Conectar a la base de datos
connectDB();

// --- MIDDLEWARES
app.use(express.json());
app.use(cors());

// --- RUTAS ---
app.get("/", (req, res) => res.send("API Corriendo..."));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// --- INICIAR SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
