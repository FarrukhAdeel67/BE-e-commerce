module.exports = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      req.allow = true;
    }
    next();
  };
};
