require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const conn = require("./db");
const authRoutes = require("./routes/authRoutes");
const privateRoutes = require("./routes/privateRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.use("/private", privateRoutes);

app.listen(4000, () => {
  console.log("API REST started ...");
  conn();
});
