const HttpError = require("../models/http-error");
const Reservation = require("../models/reservation");

const addReservation = async (req, res, next) => {
    const { car, firstName, lastName, phone, age, email, address, city, zip, location, date } = req.body;
    const newReservation = new Reservation({
        car,
        name: firstName + " " + lastName,
        phone,
        age,
        email,
        address,
        city,
        zip,
        location,
        date
    });

    try {
        await newReservation.save();
        res.json({ message: "Reservation added" });
    } catch (error) {
        return next(new HttpError("Could not add reservation", 500));
    }
};

const getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        return next(new HttpError("Could not fetch reservations", 500));
    }
};

exports.addReservation = addReservation;
exports.getReservations = getReservations;