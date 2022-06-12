const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
  {
    status: {type: String},
    orderid: {type: String}
  }
);

module.exports = mongoose.model("Shipping", ShippingSchema);