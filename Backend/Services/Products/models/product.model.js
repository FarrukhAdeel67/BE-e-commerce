"use strict";
const moment = require("moment");
// const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("products", {
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

  Product.beforeCreate((Product) => {
    Product.dataValues.createdAt = moment().unix();
    Product.dataValues.updatedAt = moment().unix();
  });
  Product.beforeUpdate((Product) => {
    Product.dataValues.updatedAt = moment().unix();
  });
  Product.associate = (models) => {
    Product.belongsToMany(models.Carts, {
      through: models.CartProducts,
      foreignKey: "fkProductId",
      otherKey: "fkCartId",
      as: "users",
    });
  };
  return Product;
};
