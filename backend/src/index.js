const express = require("express");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const cors = require("cors");
const reservationRoutes = require("./routes/reservation-routes");
const userRoutes = require("./routes/user-routes");
const carRoutes = require("./routes/car-routes");
const testemonialRoutes = require("./routes/testemonial-routes");
const HttpError = require("./models/http-error");

config();

const app = express();

app.use("/api/images", express.static("images"));

app.use(cors());
app.use(express.json());

app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/testemonials", testemonialRoutes);

app.use((req, res, next) => {
  next(new HttpError("Could not find this route", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = error.code && typeof error.code === 'number' && error.code >= 400 && error.code < 600 ? error.code : 500;

  if (statusCode === 500 && error.code === 'ENOENT') {
    statusCode = 404;
    error.message = 'File or directory not found';
  }

  res.status(statusCode);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to database");
  app.listen(3000);
});
