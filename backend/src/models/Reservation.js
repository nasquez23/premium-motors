const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  car: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
});

const reservationModel = mongoose.model("Reservation", reservationSchema);

module.exports = reservationModel;
