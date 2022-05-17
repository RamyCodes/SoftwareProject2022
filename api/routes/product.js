const Product = require("../models/Product");


const router = require("express").Router();

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  var qItem = req.query.item;

  try {
    let products;

    if (qItem) {
      products = await Product.find({
        item: {
          $in: [qItem],
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
