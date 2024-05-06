const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    testemonials: [{ type: mongoose.Types.ObjectId, ref: 'Testemonial' }]
});

userSchema.plugin(uniqueValidator);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;