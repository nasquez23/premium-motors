const { Router } = require("express");

const usersController = require("../controllers/users-controller");

const checkAuthorization = require("../middleware/check-auth");

const router = Router();

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.use(checkAuthorization);

router.get("/user/:uid", usersController.getUserById)

module.exports = router;