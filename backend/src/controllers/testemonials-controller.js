const Testemonial = require('../models/testemonial');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const { getImageUrl } = require('../middleware/file-upload');

const getTestemonials = async (req, res, next) => {
    try {
        const testemonials = await Testemonial.find().populate('author', 'name image').lean();

        const updatedTestemonials = await Promise.all(testemonials.map(async (testemonial) => {
            const imageUrl = await getImageUrl(testemonial.author.image);
            return {
                ...testemonial,
                author: {
                    ...testemonial.author,
                    image: imageUrl,
                },
            };
        }));

        res.json(updatedTestemonials);
    } catch (error) {
        return next(new HttpError('Could not fetch testemonials', 500));
    }
};

const addTestemonial = async (req, res, next) => {
    const { message, city, country, rating } = req.body;

    const newTestemonial = new Testemonial({
        message,
        city,
        country,
        rating,
        author: req.userData.userId,
    });

    let user;

    try {
        user = await User.findById(req.userData.userId);
    } catch (error) {
        return next(new HttpError('Could not add testemonial', 500));
    }

    if (!user) {
        return next(new HttpError('Could not find user for provided id', 404));
    }

    try {
        await newTestemonial.save();
        user.testemonials.push(newTestemonial);
        await user.save();
    } catch (error) {
        return next(new HttpError('Could not add testemonial', 500));
    }

    res.status(201).json(newTestemonial);
};

const getTestemonialsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let user;

    try {
        user = await User.findById(userId).select('-password').populate('testemonials');
    } catch (error) {
        return next(new HttpError('Could not fetch testemonials', 500));
    }

    if (!user || user.testemonials.length === 0) {
        return next(new HttpError('Could not find testemonial for the provided user id', 404));
    }

    res.json(user.testemonials);
}

const updateTestemonial = async (req, res, next) => {
    const testemonialId = req.params.tid;
    const { message, city, country, rating } = req.body;

    let testemonialToUpdate;

    try {
        testemonialToUpdate = await Testemonial.findById(testemonialId);
    } catch (error) {
        return next(new HttpError('Could not update testemonial', 500));
    }

    if (!testemonialToUpdate) {
        return next(new HttpError('Could not find testemonial for provided id', 404));
    }

    if (testemonialToUpdate.author.toString() !== req.userData.userId) {
        return next(new HttpError('You are not allowed to edit this testemonial', 401));
    }

    testemonialToUpdate.message = message;
    testemonialToUpdate.city = city;
    testemonialToUpdate.country = country;
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

    if (testemonialToDelete.author.toString() !== req.userData.userId) {
        return next(new HttpError('You are not allowed to delete this testemonial', 401));
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