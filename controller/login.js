const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const timestamp = require("time-stamp");

exports.logInUser = async (req, res, next) => {
  let date = timestamp("YYYYMMDDHHmmss");
  const { email, password } = req.body;
  const userdb = await User.findOne({ email: email });
  if (!userdb) {
    res.json("account not found");
    return;
  }
  try {
    if (userdb.seal == true) {
      res.redirect("/account-seal");
    }

    userdb.loginAttamtData.push({
      timestamp: date,
      ip: req.ip,
    });

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
    userdb.loginAttamt += 1;

    if (userdb.loginAttamt >= 5) {
      userdb.seal = true;
      userdb.sealTimeStamp = date;
      await userdb.save();
      res.status(200).json("account seale");
      return;
    }
    await userdb.save();

    res.status(404).json({ err: "somthing wrong" });
  }
};
