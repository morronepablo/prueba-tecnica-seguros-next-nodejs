const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "El nombre es obligatorio"] },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: 0,
    },
    image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    stock: { type: Number, required: true, default: 0, min: 0 },
    category: { type: String, required: [true, "La categoría es obligatoria"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
