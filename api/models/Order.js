const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        item: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object},
    status: { type: String, default: "CREATED" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
