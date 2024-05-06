const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testemonialSchema = new Schema({
    message: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const testemonialModel = mongoose.model('Testemonial', testemonialSchema);

module.exports = testemonialModel;