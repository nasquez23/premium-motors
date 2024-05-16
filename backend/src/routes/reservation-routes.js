const { Router } = require('express');

const reservationController = require('../controllers/reservations-controller');

const checkAuthorization = require('../middleware/check-auth');

const router = Router();

router.post("/", reservationController.addReservation);

router.use(checkAuthorization);

router.get("/", reservationController.getReservations);

module.exports = router;
