const { Router } = require("express");
const router = Router();

const userRouter = require("./user.route");
router.use("/users", userRouter);

module.exports = router;
