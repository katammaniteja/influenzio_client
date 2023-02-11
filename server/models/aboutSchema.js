const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: {
      type: String,
    },
    location: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    social_handles: [
      {
        name: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
        followers: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
    work_experience: [
      {
        organization: {
          type: String,
          required: true,
        },
        start_date: {
          type: Date,
          required: true,
        },
        end_date: {
          type: Date,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const About = mongoose.model("ABOUT", aboutSchema);
module.exports = About;
