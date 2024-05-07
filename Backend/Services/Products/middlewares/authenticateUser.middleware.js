const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { generateErrorInstance } = require("../utils");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const token =
      req.header("Authorization") && req.header("Authorization").split(" ")[1];
    if (!token) {
      throw generateErrorInstance({
        status: 400,
        message: "Authorization Header required",
      });
    }
    const user = await Users.findByPk(userId);

    if (!user) {
      throw generateErrorInstance({
        status: 404,
        message: "User not Found",
      });
    }
    const decoded = jwt.verify(token, jwtSecret);
    if (user.id !== decoded.id) {
      throw generateErrorInstance({
        status: 401,
        message: "Invalid token",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
