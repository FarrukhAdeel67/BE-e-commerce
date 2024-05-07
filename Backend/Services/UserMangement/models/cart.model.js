"use strict";
const moment = require("moment");
const table = "carts";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(table, {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    itemNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
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

  Cart.beforeCreate((Cart) => {
    Cart.dataValues.createdAt = moment().unix();
    Cart.dataValues.updatedAt = moment().unix();
  });
  Cart.beforeUpdate((Cart) => {
    Cart.dataValues.updatedAt = moment().unix();
  });
  Cart.associate = (models) => {
    Cart.belongsTo(models.Users, {
      foreignKey: "fkUserId",
      as: "user",
    });
    Cart.belongsToMany(models.Products, {
      through: models.CartProducts,
      foreignKey: "fkCartId",
      otherKey: "fkProductId",
      as: "products",
    });
  };
  return Cart;
};
