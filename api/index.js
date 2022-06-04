const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
const orderRoute = require("./routes/order");
const cors = require("cors");


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.get('/api/processing', (req, res) => {
    res.status(200).send({
      status: "PROCESSING"
    })
});

app.get('/api/fulfilled', (req, res) => {
  res.status(200).send({
    status: "FULFILLED"
  })
});

app.get('/api/shipped', (req, res) => {
  res.status(200).send({
    status: "SHIPPED"
  })
});

app.get('/api/delivered', (req, res) => {
  res.status(200).send({
    status: "DELIVERED"
  })
});

app.get('/api/returned', (req, res) => {
  res.status(200).send({
    status: "RETURNED"
  })
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
