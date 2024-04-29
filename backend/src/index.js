const express = require("express");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const cors = require("cors");
const reservationRoutes = require("./routes/reservation-routes");
const userRoutes = require("./routes/user-routes");
const carRoutes = require("./routes/car-routes");
const HttpError = require("./models/http-error");

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);

app.use((req, res) => {
  throw new HttpError("Could not find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to database");
  app.listen(3000);
});
