const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const authenticate = require("./../middleware/authenticate");
const Influencer = require("../models/userSchema");

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  try {
    if (!email || !name || !password || !cpassword) {
      res.status(422).json({ error: "All fields are required" });
    } else if (password != cpassword) {
      res.status(422).json({ error: "Passwords are not matched" });
    } else {
      const userExist = await Influencer.findOne({ email: email });
      if (userExist) {
        res.status(422).json({ error: "Email already taken" });
      } else {
        const influencer = new Influencer(req.body);
        await influencer.save();
        res.status(201).json({ message: "Registration Succcessful" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(422).json({ error: "All fields are required" });
    } else {
      const influencer = await Influencer.findOne({ email: email });
      if (!influencer) {
        res.status(422).json({ error: "Invalid email" });
      } else {
        const isValidUser = await bcrypt.compare(password, influencer.password);
        if (!isValidUser) {
          res.status(422).json({ error: "Invalid password" });
        } else {
          const token = await influencer.generateAuthToken();
          res.status(200).json({ jwttoken: token });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("User logout");
});

router.get("/verifyuser", authenticate, (req, res) => {
  res.status(200).json({ message: "Valid User" });
});

module.exports = router;
