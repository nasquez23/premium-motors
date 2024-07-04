const HttpError = require('../models/http-error');
const Car = require('../models/car');
const { uploadFileToS3, getImageUrl, deleteFileFromS3 } = require('../middleware/file-upload');

const getCars = async (req, res, next) => {
    try {
        const cars = await Car.find();
        for (const car of cars) {
            const imageUrl = await getImageUrl(car.image);
            car.image = imageUrl;
        }
        res.json(cars);
    } catch (error) {
        return next(new HttpError('Could not fetch cars', 500));
    }
};

const getCarById = async (req, res, next) => {
    const carId = req.params.id;

    let car;
    try {
        car = await Car.findById(carId);
    } catch (error) {
        return next(new HttpError('Something went wrong, could not find a car.', 500));
    }

    if (!car) {
        return next(new HttpError('Could not find car for the provided id', 404));
    }

    const imageUrl = await getImageUrl(car.image);
    car.image = imageUrl;

    res.json(car);
};

const addCar = async (req, res, next) => {
    const { manufacturer, model, year, engine, price, power, gearbox, isForSale } = req.body;

    if (!req.file){
        return next(new HttpError('Please select an image', 400));
    }

    const image = await uploadFileToS3(req.file);

    const newCar = new Car({
        manufacturer,
        model,
        year,
        engine,
        price,
        image,
        power,
        gearbox,
        isForSale
    });

    try {
        await newCar.save();
    } catch (error) {
        return next(new HttpError('Could not add car', 500));
    }

    res.status(201).json({ message: 'Succesfully added a car.' });
};

const updateCar = async (req, res, next) => {
    const carId = req.params.id;
    const { manufacturer, model, year, engine, price, power, gearbox, isForSale } = req.body;
    
    let carToUpdate;
    try {
        carToUpdate = await Car.findById(carId);
    } catch (error) {
        return next(new HttpError('Something went wrong, could not update car.', 500));
    }

    if (!carToUpdate) {
        return next(new HttpError('Could not find car for the provided id', 404));
    }

    if (req.file && carToUpdate.image) {
        await deleteFileFromS3(carToUpdate.image);
        const newImage = await uploadFileToS3(req.file);
        carToUpdate.image = newImage;
    }

    carToUpdate.manufacturer = manufacturer;
    carToUpdate.model = model;
    carToUpdate.year = year;
    carToUpdate.engine = engine;
    carToUpdate.price = price;
    carToUpdate.power = power;
    carToUpdate.gearbox = gearbox;
    carToUpdate.isForSale = isForSale;

    try {
        await carToUpdate.save();
    } catch (error) {
        return next(new HttpError('Could not update car', 500));
    }

    res.json(carToUpdate);
};

const deleteCar = async (req, res, next) => {
    const carId = req.params.id;

    let car;
    try {
        car = await Car.findById(carId);
    } catch (error) {
        return next(new HttpError('Something went wrong, could not delete car.', 500));
    }

    if (!car) {
        return next(new HttpError('Could not find car for the provided id', 404));
    }

    try {
        await Car.deleteOne({ _id: carId });
        await deleteFileFromS3(car.image);
    } catch (error) {
        return next(new HttpError('Could not delete car', 500));
    }

    res.json({ message: 'Deleted car' });
}

exports.getCarById = getCarById;
exports.getCars = getCars;
exports.addCar = addCar;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;