const { Router } = require("express");
const router = Router();
const authenticateUser = require("../middlewares/authenticateUser.middleware");
// Routers
const cartRouter = require("./cart.route");
router.use("/users/:userId/cart", authenticateUser, cartRouter);

module.exports = router;
