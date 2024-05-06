const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError("Signing up failed, please try again later.", 500));
    }

    if (existingUser) {
        return next(new HttpError("User exists already, please login instead.", 422));
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        return next(new HttpError("Could not create user, please try again.", 500));
    }

    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        testemonials: []
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError("Signing up failed, please try again later.", 500));
    }

    let token;
    try {
        token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, "supersecret_dont_share", { expiresIn: "1h" });
    } catch (error) {
        return next(new HttpError("Signing up failed, please try again later.", 500));
    }

    res.status(201).json({ userId: createdUser.id, token });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError("Logging in failed, please try again later.", 500));
    }

    if (!existingUser) {
        return next(new HttpError("User doesn't exist.", 401));
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
        return next(new HttpError("Could not log you in, please check your credentials and try again.", 500));
    }

    if (!isValidPassword) {
        return next(new HttpError("Invalid credentials, could not log you in.", 401));
    }

    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, token }, "supersecret_dont_share", { expiresIn: "1h" });
    } catch (error) {
        return next(new HttpError("Logging in failed, please try again later.", 500));
    }

    res.json({ userId: existingUser.id, token });
};

exports.signup = signup;
exports.login = login;