const Product = require("../models/Product");
const express = require("express");

const csvtojson = require("csvtojson");

const router = require("express").Router();

//CREATE

router.post('/add', async (req, res) => {

	csvtojson()
		.fromFile("ProductsOrig.csv")
		.then(csvData => {
			console.log(csvData);
			Product.insertMany(csvData).then(function () {
				console.log("Data inserted")
				res.json({success: 'success'});
			}).catch(function(error){
				console.log(error)
			});
		});
})

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  var qName = req.query.name;

  try {
    let products;

    if (qName) {
      products = await Product.find({
        name: {
          $in: [qName],
        },
        
      })}

   else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
