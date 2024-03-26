const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Reservation = require("./models/Reservation");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!");
});

app.post("/reservation", async (req, res) => {
  const newReservation = new Reservation({
    car: req.body.car,
    name: req.body.firstName + " " + req.body.lastName,
    phone: req.body.phone,
    age: req.body.age,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    zip: req.body.zip,
    location: req.body.location,
    date: req.body.date,
  });

  try {
    const savedReservation = await newReservation.save();
    res.json(savedReservation);
  } catch (err) {
    res.json({ message: err });
  }
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to database");
  app.listen(3000);
});
