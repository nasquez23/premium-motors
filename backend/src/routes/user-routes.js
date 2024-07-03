const { Router } = require("express");

const usersController = require("../controllers/users-controller");

const checkAuthorization = require("../middleware/check-auth");
const { upload } = require("../middleware/file-upload");

const router = Router();

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.use(checkAuthorization);

router.get("/user/:uid", usersController.getUserById);

router.patch("/user/:uid", upload.single("image"), usersController.updateUser);

module.exports = router;