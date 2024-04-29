const { Router } = require("express");

const carsController = require('../controllers/cars-controller');

const router = Router();

router.get('/', carsController.getCars);

router.get('/:id', carsController.getCarById);

router.post('/add', carsController.addCar);

router.patch('/:id', carsController.updateCar);

router.delete('/:id', carsController.deleteCar);

module.exports = router;