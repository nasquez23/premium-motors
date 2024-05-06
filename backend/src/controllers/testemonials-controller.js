const Testemonial = require('../models/testemonial');
const User = require('../models/user');
const HttpError = require('../models/http-error');

const getTestemonials = async (req, res, next) => {
    try {
        const testemonialToUpdates = await testemonialToUpdate.find();
        res.json(testemonialToUpdates);
    } catch (error) {
        return next(new HttpError('Could not fetch testemonials', 500));
    }
};

const addTestemonial = async (req, res, next) => {
    const { message, city, country, image, rating, author } = req.body;

    const newtestemonialToUpdate = new testemonialToUpdate({
        message,
        city,
        country,
        image,
        rating,
        author
    });

    let user;

    try {
        user = await User.findById(author);
    } catch (error) {
        return next(new HttpError('Could not add testemonial', 500));
    }

    if (!user) {
        return next(new HttpError('Could not find user for provided id', 404));
    }

    try {
        await newtestemonialToUpdate.save();
        user.testemonialToUpdates.push(newtestemonialToUpdate);
        await user.save();
    } catch (error) {
        return next(new HttpError('Could not add testemonial', 500));
    }

    res.status(201).json(newtestemonialToUpdate);
};

const getTestemonialsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let user;

    try {
        user = await User.findById(userId).populate('testemonials');
    } catch (error) {
        return next(new HttpError('Could not fetch testemonials', 500));
    }

    if (!user || user.testemonialToUpdates.length === 0) {
        return next(new HttpError('Could not find testemonial for the provided user id', 404));
    }

    res.json(user.testemonialToUpdates);
}

const updateTestemonial = async (req, res, next) => {
    const testemonialId = req.params.tid;

    const { message, city, country, image, rating } = req.body;

    let testemonialToUpdate;

    try {
        testemonialToUpdate = await Testemonial.findById(testemonialId);
    } catch (error) {
        return next(new HttpError('Could not update testemonial', 500));
    }

    if (!testemonialToUpdate) {
        return next(new HttpError('Could not find testemonial for provided id', 404));
    }

    testemonialToUpdate.message = message;
    testemonialToUpdate.city = city;
    testemonialToUpdate.country = country;
    testemonialToUpdate.image = image;
    testemonialToUpdate.rating = rating;

    try {
        await testemonialToUpdate.save();
    } catch (error) {
        return next(new HttpError('Could not update testemonial', 500));
    }

    res.json(testemonialToUpdate);
};

const deleteTestemonial = async (req, res, next) => {
    const testemonialId = req.params.tid;

    let testemonialToDelete;
    try {
        testemonialToDelete = await Testemonial.findById(testemonialId);
    } catch (error) {
        return next(new HttpError('Could not delete testemonial', 500));
    }
    
    if (!testemonialToDelete) {
        return next(new HttpError('Could not find testemonial for provided id', 404));
    }

    let user;
    try {
        user = await User.findById(testemonialToDelete.author);
    } catch (error) {
        return next(new HttpError('Could not delete testemonial', 500));
    }

    try {
        await Testemonial.deleteOne({ _id: testemonialId });
        user.testemonials.pull(testemonialToDelete);
        await user.save();
    } catch (error) {
        return next(new HttpError('Could not delete testemonial', 500));
    }

    res.json({ message: 'Deleted testemonial' });
};

exports.getTestemonials = getTestemonials;
exports.addTestemonial = addTestemonial;
exports.getTestemonialsByUserId = getTestemonialsByUserId;
exports.updateTestemonial = updateTestemonial;
exports.deleteTestemonial = deleteTestemonial;