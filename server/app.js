const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// Securing the sensitive information
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());
app.use(require("./routers/auth"));
app.use(require("./routers/about"));

app.listen(5000);
