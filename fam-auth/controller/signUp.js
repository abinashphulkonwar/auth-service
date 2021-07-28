const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUpUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const passwordhash = await bcrypt.hash(password, 12);

    const userdb = await new User({ email, passwordhash });
    await userdb.save();

    const jwtToken = await jwt.sign(
      {
        email: userdb.email,
        id: userdb._id,
      },
      process.env.JWT_KEY
    );

    res.json({ token: jwtToken });
  } catch (err) {
    console.log(err.message);



    res.status(404).json({ err: "somthing wrong" });
  }
};
