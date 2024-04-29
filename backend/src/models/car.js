const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    power: { type: Number, required: true },
    gearbox: { type: String, required: true },
});

const carModel = mongoose.model('Car', carSchema);

module.exports = carModel;