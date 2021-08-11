const UserDublication = require("../utils/mongo/userDuplication");

exports.verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    const findUserObj = await new UserDublication(email);
    const findUser = await findUserObj.validate("User");

    if (findUser) {
      res.status(404).json({ err: "email already used" });
      return;
    }
    res.json({ success: "email verify" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: "somthing wrong" });
  }
};
