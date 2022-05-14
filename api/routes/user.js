//guest
const router = require("express").Router();


//GET USER
router.get("/usertest", (req, res) => {
    res.send("user test is successfull");
});

router.post("/userposttest", (req,res) => {
    const phone = req.body.phone;
    res.send("your phone number is: " + phone)
})

module.exports = router;
