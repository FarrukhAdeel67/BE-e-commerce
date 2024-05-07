const { Router } = require("express");
const router = Router();

// Routers
const productRouter = require("./product.route");
router.use("/products", productRouter);

module.exports = router;
