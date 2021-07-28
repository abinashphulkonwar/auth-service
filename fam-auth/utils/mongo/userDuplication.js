const User = require("../../db/user");

module.exports = async (req, res, next) => {
  console.log(req.body.email);

  const findUser = await User.findOne({ email: req.body.email }).select({
    email: 1,
  });

  if (findUser) {
    res.status(404).json({ err: "email already used" });
    return;
  }
  next();
};
