const Shipping = require("../models/Shipping");
const express = require("express");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
    const newShipping = new Shipping(req.body);
  
    try {
      const savedShipping = await newShipping.save();
      res.status(200).json(savedShipping);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //UPDATE
  router.put("/:id", async (req, res) => {
    try {
      const updatedShipping = await Shipping.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedShipping);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET SHIPPING
  router.get("/", async (req, res) => {
    const qShip = req.query.orderid;
    try {
      let shippings;
  
      if (qShip) {
        shippings = await Shipping.find({
          orderid: {
            $in: [qShip],
          },
        })
      }
      else {
        shippings = await Shipping.find();
      } 
    res.status(200).json(shippings);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
