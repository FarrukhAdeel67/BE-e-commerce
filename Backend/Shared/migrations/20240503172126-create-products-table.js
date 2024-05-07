"use strict";
const { DataTypes } = require("sequelize");
const moment = require("moment");
const table = "products";
const createdAt = moment().unix();
const updatedAt = moment().unix();
module.exports = {
  up: async function (queryInterface) {
    await queryInterface.createTable(table, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
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
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: 1,
          title: "IPhone 11",
          price: 750,
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur",
          imgUrl: "/assets/images/products/iphone11.png",
          createdAt,
          updatedAt,
        },
        {
          id: 2,
          title: "IPhone 11 Pro Max",
          price: 800,
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.",
          imgUrl: "/assets/images/products/iphone11promax.png",
          createdAt,
          updatedAt,
        },
        {
          id: 3,
          title: "IPhone 12 Mini",
          price: 950,
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.",
          imgUrl: "/assets/images/products/iphone12mini.png",
          createdAt,
          updatedAt,
        },
        {
          id: 4,
          title: "IPhone 12",
          price: 1050,
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage",
          imgUrl: "/assets/images/products/iphone12.png",
          createdAt,
          updatedAt,
        },
        {
          id: 5,
          title: "IPhone 12 Pro",
          price: 1150,
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage",
          imgUrl: "/assets/images/products/iphone12pro.png",
          createdAt,
          updatedAt,
        },
        {
          id: 6,
          title: "IPhone 12 Pro Max",
          price: 1250,
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage",
          imgUrl: "/assets/images/products/iphone12promax.png",
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
