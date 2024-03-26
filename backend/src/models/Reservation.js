const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  car: String,
  name: String,
  phone: String,
  age: Number,
  email: String,
  address: String,
  city: String,
  zip: String,
  location: String,
  date: Date,
});

const reservationModel = mongoose.model("Reservation", reservationSchema);

module.exports = reservationModel;
