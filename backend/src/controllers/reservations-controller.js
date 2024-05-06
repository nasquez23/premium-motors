const HttpError = require("../models/http-error");
const Reservation = require("../models/reservation");
const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (reservationData) => {
    const { name, email, date, car } = reservationData;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Reservation Confirmation",
        text: `Dear ${name},\n\nThank you for your reservation!\n\nDetails:\nCar: ${car}\nDate: ${date}\n\nBest regards,\nPremium Motors.`
    };

    await transporter.sendMail(mailOptions);
};

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
        await sendConfirmationEmail(newReservation);
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