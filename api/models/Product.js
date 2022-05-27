const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    item: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    availability: { type: Boolean, default: true },
    brandname: { type: String, required: true },
    category: { type: String },
    img: {type: String},
  }
);

module.exports = mongoose.model("Product", ProductSchema);
