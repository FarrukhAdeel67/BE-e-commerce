"use strict";
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const table = "users";
const name = "Umair Syed";
const email = "itsumairsyed@gmail.com";
const createdAt = moment().unix();
const updatedAt = moment().unix();
const plainPassword = "itsumairsyed";

module.exports = {
  up: async function (queryInterface) {
    await queryInterface.createTable(table, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 128],
        },
      },
      role: {
        type: DataTypes.ENUM("Admin", "User"),
        allowNull: true,
        defaultValue: "User",
      },
      createdAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await queryInterface.bulkInsert(
      table,
      [
        {
          email,
          password: hashedPassword,
          name,
          role: "Admin",
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(table);
  },
};
