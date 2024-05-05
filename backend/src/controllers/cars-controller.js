const HttpError = require('../models/http-error');
const Car = require('../models/car');

const getCars = async (req, res, next) => {
    try {
        const cars = await Car.find();
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

    res.json(car);
};

const addCar = async (req, res, next) => {
    const { manufacturer, model, year, engine, price, image, power, gearbox, isForSale } = req.body;

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

    const { manufacturer, model, year, engine, price, image, power, gearbox, isForSale } = req.body;

    let carToUpdate;
    try {
        carToUpdate = await Car.findById(carId);
    } catch (error) {
        return next(new HttpError('Something went wrong, could not update car.', 500));
    }

    if (!carToUpdate) {
        return next(new HttpError('Could not find car for the provided id', 404));
    }

    carToUpdate.manufacturer = manufacturer;
    carToUpdate.model = model;
    carToUpdate.year = year;
    carToUpdate.engine = engine;
    carToUpdate.price = price;
    carToUpdate.image = image;
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