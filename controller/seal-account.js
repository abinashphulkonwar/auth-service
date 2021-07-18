const User = require("../db/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const timeStamp = require("time-stamp");

exports.sealAccount = async (req, res, next) => {
  try {
    let date = timeStamp("YYYYMMDDHHmmss");
    const { email, password } = req.body;
    const userdb = await User.findOne({ email: email }).select({
      _id: 1,
      username: 1,
      email: 1,
      sealTimeStamp: 1,
      seal: 1,
    });
    if (+userdb.sealTimeStamp - date >= 30) {
      userdb.seal = true;
    }

    let passwordVal = await bcrypt.compare(password, userdb.passwordhash);
    if (passwordVal) {
      let jwtToken = await jwt.sign(
        {
          username: userdb.username,
          email: userdb.email,
          id: userdb._id,
        },
        process.env.JWT_KEY
      );
      await userdb.save();
      res.json({ token: jwtToken });
    } else {
      res.status(404).json({ err: "email or password wrong" });
    }
  } catch (err) {
    console.log(err);
    res.json({ err: "somthing wrong" });
  }
};
