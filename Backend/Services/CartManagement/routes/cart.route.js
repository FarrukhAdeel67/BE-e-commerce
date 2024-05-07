const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/cart.controller");
// Routers
router.route("/add").post(controller.addToCart);
router.route("/getCartItems").get(controller.getCartItems);
router.route("/countCartItems").get(controller.getCartItemsCount);
router.route("/removeCartItem").delete(controller.removeCartItem);

module.exports = router;
