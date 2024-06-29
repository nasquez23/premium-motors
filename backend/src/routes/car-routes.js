const { Router } = require("express");

const carsController = require('../controllers/cars-controller');

const checkAuthorization = require('../middleware/check-auth');
const fileStorage = require('../middleware/file-upload');

const router = Router();

router.get('/', carsController.getCars);

router.get('/:id', carsController.getCarById);

router.use(checkAuthorization);

router.post('/add', fileStorage.single("image"), carsController.addCar);

router.patch('/:id', fileStorage.single("image"), carsController.updateCar);

router.delete('/:id', carsController.deleteCar);

module.exports = router;