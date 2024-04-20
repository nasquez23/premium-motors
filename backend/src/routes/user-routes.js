const { Router } = require("express");

const usersController = require("../controllers/users-controller");

const router = Router();

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

module.exports = router;