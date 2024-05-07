const { Router } = require("express");
const router = Router();

// Middlewares
// Controllers
const controller = require("../controllers/product.controller");
// Routers

router.route("/").get(controller.get);
router.route("/product/:productId").get(controller.getSingleProduct);

module.exports = router;
