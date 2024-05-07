const { Products, Carts, CartProducts, sequelize } = require("../models");

module.exports = {
  addToCart: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { user } = req;
      const { productId } = req.body;
      if (!productId) {
        await t.rollback();
        return res.status(409).send("Product Id is required");
      }

      const product = await Products.findByPk(productId);
      if (!product) {
        await t.rollback();
        return res.status(404).send("Product not found");
      }

      let cart = await Carts.findOne({
        where: {
          fkUserId: user.id,
        },
        transaction: t,
      });

      if (cart) {
        const { count } = await CartProducts.findAndCountAll({
          where: {
            fkCartId: cart.id,
          },
          transaction: t,
        });
        cart = await cart.update(
          {
            itemNumber: count + 1,
          },
          { transaction: t }
        );
      } else {
        cart = await Carts.create(
          {
            fkUserId: user.id,
            itemNumber: 1,
          },
          { transaction: t }
        );
      }

      let cartProduct = await CartProducts.findOne({
        where: {
          fkCartId: cart.id,
          fkProductId: productId,
        },
        transaction: t,
      });

      if (cartProduct) {
        await t.rollback();
        return res.status(409).send("Product already added to the cart");
      } else {
        cartProduct = await CartProducts.create(
          {
            fkCartId: cart.id,
            fkProductId: productId,
          },
          { transaction: t }
        );
      }

      await t.commit();
      res.status(200).json({
        message: "Product added to cart.",
      });
    } catch (err) {
      console.log(err);
      await t.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  getCartItemsCount: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { user } = req;
      const cart = await Carts.findOne({
        where: {
          fkUserId: user.id,
        },
        transaction: t,
      });
      await t.commit();
      res.status(200).json({
        count: cart.itemNumber,
      });
    } catch (err) {
      console.log(err);
      await t.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  getCartItems: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { user } = req;
      const cart = await Carts.findOne({
        where: {
          fkUserId: user.id,
        },
        include: {
          model: Products,
          as: "products",
          through: {
            attributes: [],
          },
        },
        transaction: t,
      });

      await t.commit();
      res.status(200).json({
        cartProducts: cart.products,
      });
    } catch (err) {
      console.log(err);
      await t.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },

  //   removeCartItem: async (req, res) => {
  //     const t = await sequelize.transaction();
  //     try {
  //       const { user } = req;
  //       const { productId } = req.body;
  //       const product = await Products.findByPk(productId);
  //       if (!product) {
  //         await t.rollback();
  //         return res.status(404).send("Product not found");
  //       }
  //       let cart = await Carts.findOne({
  //         where: {
  //           fkUserId: user.id,
  //         },
  //         transaction: t,
  //       });
  //       if (!cart) {
  //         await t.rollback();
  //         return res.status(404).send("cart not found");
  //       }

  //       cart = await cart.update({
  //         itemNumber: cart.itemNumber - 1,
  //       });

  //       let cartProduct = await CartProducts.findOne({
  //         where: {
  //           fkCartId: cart.id,
  //           fkProductId: productId,
  //         },
  //         transaction: t,
  //       });

  //       if (!cartProduct) {
  //         await t.rollback();
  //         return res.status(409).send("Product already removed from the cart");
  //       } else {
  //         await cartProduct.destroy();
  //       }

  //       await t.commit();
  //       res.status(200).json({
  //         message: "Product removed from the cart",
  //         count: cart.itemNumber,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       await t.rollback();
  //       return res
  //         .status(err.status || 500)
  //         .send(err.message || "Something went wrong!");
  //     }
  //   },
  removeCartItem: async (req, res) => {
    let t;
    try {
      t = await sequelize.transaction();

      const { user } = req;
      const { productId } = req.body;

      const product = await Products.findByPk(productId, { transaction: t });
      if (!product) {
        await t.rollback();
        return res.status(404).send("Product not found");
      }

      let cart = await Carts.findOne({
        where: {
          fkUserId: user.id,
        },
        transaction: t,
      });

      if (!cart) {
        await t.rollback();
        return res.status(404).send("Cart not found");
      }

      cart = await cart.update(
        {
          itemNumber: cart.itemNumber - 1,
        },
        { transaction: t }
      );

      let cartProduct = await CartProducts.findOne({
        where: {
          fkCartId: cart.id,
          fkProductId: productId,
        },
        transaction: t,
      });

      if (!cartProduct) {
        await t.rollback();
        return res.status(409).send("Product already removed from the cart");
      } else {
        await cartProduct.destroy({ transaction: t });
      }

      await t.commit();
      res.status(200).json({
        message: "Product removed from the cart",
        count: cart.itemNumber,
      });
    } catch (err) {
      console.log(err);
      if (t) await t.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
