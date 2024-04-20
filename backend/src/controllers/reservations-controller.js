const Reservation = require("../models/Reservation");

const addReservation = async (req, res) => {
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
    } catch (error) {
        res.json(error);
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.json(error);
    }
};

exports.addReservation = addReservation;
exports.getReservations = getReservations;