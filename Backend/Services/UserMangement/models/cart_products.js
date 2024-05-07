"use strict";
const moment = require("moment");
const table = "cart_products";
module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define(table, {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fkProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fkUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  CartProduct.beforeCreate((cartProduct) => {
    cartProduct.dataValues.createdAt = moment().unix();
    cartProduct.dataValues.updatedAt = moment().unix();
  });
  CartProduct.beforeUpdate((cartProduct) => {
    cartProduct.dataValues.updatedAt = moment().unix();
  });

  return CartProduct;
};
