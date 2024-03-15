const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!");
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to database");
  app.listen(3000);
});
