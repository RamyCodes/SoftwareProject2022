const User = require("../models/User");
const router = require("express").Router();

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
      email: req.body.email,
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET USER
router.get("/find", async (req, res) => {
    const qEmail = req.query.email;
    try {
      let users;
  
      if (qEmail) {
        users = await User.find({
          email: {
            $in: [qEmail],
          },
        })
      }
      else {
        users = await users.find();
      } 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
  });

module.exports = router;