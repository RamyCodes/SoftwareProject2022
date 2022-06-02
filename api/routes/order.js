const Order = require("../models/Order");


const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/", async (req, res) => {
  try {
    const deleted = await Order.deleteMany({});
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ORDER BY TOKEN
// router.get("/find", async (req, res) => {
//   const qToken = req.query.token;
//   try {
//     let orders;

//     if (qToken) {
//       orders = await Order.find({
//         token: {
//           $in: [qToken],
//         },
//       })
//     } 
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ALL

router.get("/", async (req, res) => {
    const qToken = req.query.token;
    try {
      let orders;
  
      if (qToken) {
        orders = await Order.find({
          token: {
            $in: [qToken],
          },
        })
      }
      else {
        orders = await Order.find();
      } 
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
