const { getImageUrl, uploadFileToS3, deleteFileFromS3 } = require("../middleware/file-upload");
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
        image: "default.jpg",
        testemonials: []
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError("Signing up failed, please try again later.", 500));
    }

    let token;
    try {
        token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_KEY, { expiresIn: "1h" });
    } catch (error) {
        return next(new HttpError("Signing up failed, please try again later.", 500));
    }

    const userImage = await getImageUrl(createdUser.image);

    res.status(201).json({ userId: createdUser.id, token, userImage });
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
        token = jwt.sign({ userId: existingUser.id, token }, process.env.JWT_KEY, { expiresIn: "1h" });
    } catch (error) {
        return next(new HttpError("Logging in failed, please try again later.", 500));
    }

    const userImage = await getImageUrl(existingUser.image);

    res.json({ userId: existingUser.id, token, userImage });
};

const getUserById = async (req, res, next) => {
    const userId = req.params.uid;

    try {
        const user = await User.findById(userId).select("-password").populate({
            path: 'testemonials',
            populate: { path: 'author', select: 'name image' }
        });        
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const imageUrl = await getImageUrl(user.image);
        user.image = imageUrl;
        
        user.testemonials.forEach(testemonial => {
            testemonial.author.image = imageUrl;
        });

        res.json(user);
    } catch (error) {
        return next(new HttpError("Fetching user failed, please try again later.", 500));
    }
};

const updateUser = async (req, res, next) => {
    const userId = req.params.uid;
    const { name, email } = req.body;

    if (req.userData.userId !== userId) {
        return next(new HttpError("You are not allowed to edit this user.", 401));
    }

    try {
        const userToUpdate = await User.findById(userId).select("-password").populate("testemonials");
        if (!userToUpdate) {
            return next(new HttpError("User not found.", 404));
        }

        if (req.file) {
            if (userToUpdate.image !== "default.jpg") {
                await deleteFileFromS3(userToUpdate.image);
            }
            const newImage = await uploadFileToS3(req.file);
            userToUpdate.image = newImage;
        }
        userToUpdate.name = name;
        userToUpdate.email = email;
        await userToUpdate.save();
        userToUpdate.image = await getImageUrl(userToUpdate.image);
        res.json(userToUpdate);
    } catch (error) {
        return next(new HttpError("Updating user failed, please try again later.", 500));
    }
};

exports.signup = signup;
exports.login = login;
exports.getUserById = getUserById;
exports.updateUser = updateUser;