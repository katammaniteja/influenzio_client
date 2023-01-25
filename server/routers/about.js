const express = require("express");
const router = express.Router();
const About = require("./../models/aboutSchema");
const authenticate = require("./../middleware/authenticate");

router.get("/about", authenticate, async (req, res) => {
  try {
    const email = req.email;
    const about = await About.findOne({ email: email });
    res.status(200).json(about);
  } catch (error) {
    console.log(error);
  }
});

router.put("/about", authenticate, async (req, res) => {
  try {
    const email = req.email;
    await About.findOneAndUpdate({ email: email }, { ...req.body });
    res.status(201).json({ message: "Your Profile Updated" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
