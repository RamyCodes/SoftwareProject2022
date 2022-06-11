const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: {type: String},
    weight: { type: String },
    measurement: {type: String},
    category: { type: String },
    stock: { type: String },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
