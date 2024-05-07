const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/user.controller");

router.route("/login").post(controller.login);
router.route("/signUp").post(controller.signUp);

module.exports = router;
