const express = require("express");
const app = express();

// Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Securing the sensitive information
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());
app.use(require("./routers/auth"));

app.listen(5000);
