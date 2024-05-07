const { jwtSecret } = require("../config");
const { Users } = require("../models");
const { generateErrorInstance } = require("../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  signUp: async (req, res) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        throw generateErrorInstance({
          status: 400,
          message: "Required fields can't be empty",
        });
      }
      let user = await Users.findOne({
        where: {
          email,
        },
      });

      if (user) {
        throw generateErrorInstance({
          status: 409,
          message: "User already exists!",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await Users.create({
        name,
        email,
        password: hashedPassword,
      });

      user = user.toJSON();
      delete user.password;

      const token = jwt.sign(user, jwtSecret);

      return res
        .status(200)
        .send({ user, token, message: "user created successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw generateErrorInstance({
          status: 400,
          message: "Required fields can't be empty",
        });
      }
      let user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw generateErrorInstance({
          status: 404,
          message: "User not found",
        });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        throw generateErrorInstance({
          status: 401,
          message: "Invalid Password",
        });
      }

      user = user.toJSON();
      delete user.password;

      const token = jwt.sign(user, jwtSecret);

      return res
        .status(200)
        .send({ user, token, message: `Welcome back ${user.name}!` });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
