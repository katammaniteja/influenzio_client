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

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.put(
  "/about",
  authenticate,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      let profile = req.file ? req.file.filename : null;
      const email = req.email;
      await About.findOneAndUpdate(
        { email: email },
        { ...req.body, profilePic: profile }
      );
      res.status(201).json({ message: "Your Profile Updated" });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
