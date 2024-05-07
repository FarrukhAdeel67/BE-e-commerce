const { Products, sequelize } = require("../models");
module.exports = {
  get: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const products = await Products.findAll();
      await t.commit();
      res.status(200).json({
        products,
      });
    } catch (err) {
      console.log(err);
      await t.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  getSingleProduct: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { productId } = req.params;
      if (!productId) {
        return res.send(409).send("product id is required");
      }
      const product = await Products.findByPk(productId);
      if (!product) {
        return res.send(404).send("product not found");
      }
      await t.commit();
      res.status(200).json({
        product,
      });
    } catch (err) {
      console.log(err);
      await t.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
