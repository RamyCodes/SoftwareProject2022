const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    item: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    brandname: { type: String, required: true },
    category: { type: String },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
