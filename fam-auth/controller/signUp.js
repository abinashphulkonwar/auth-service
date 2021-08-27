const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserDublication = require("../utils/mongo/userDuplication");

exports.signUpUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    const findUserObj = await new UserDublication(email);
    const findUser = await findUserObj.validate("User");

    if (findUser) {
      res.status(404).json({ err: "email already used" });
      return;
    }

    const passwordhash = await bcrypt.hash(password, 12);

    const userdb = await new User({ email, passwordhash, username });
    await userdb.save();

    const jwtToken = await jwt.sign(
      {
        email: userdb.email,
        id: userdb._id,
        username: userdb.username,
      },
      process.env.JWT_KEY
    );

    res.json({ token: jwtToken });
  } catch (err) {
    console.log(err.message);

    res.status(404).json({ err: "somthing wrong" });
  }
};
