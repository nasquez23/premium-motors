const { Router } = require('express');

const reservationController = require('../controllers/reservations-controller');

const router = Router();

router.get("/", reservationController.getReservations);

router.post("/", reservationController.addReservation);

module.exports = router;
