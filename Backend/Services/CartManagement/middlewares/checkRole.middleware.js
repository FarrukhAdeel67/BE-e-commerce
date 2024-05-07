module.exports = async (req, res, next) => {
  try {
    if (!req.allow) {
      throw {
        status: 401,
        message: "You are not authorized to access this route",
      };
    }
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
