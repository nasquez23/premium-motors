const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const reservationRoutes = require("./routes/reservation-routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reservations", reservationRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to database");
  app.listen(3000);
});
