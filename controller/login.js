const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const timestamp = require("time-stamp");
const unsealTime = require("../utils/timestamp");

exports.logInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userdb = await User.findOne({ email: email });

    userdb.loginAttamt += 1;
    if (!userdb) {
      res.json("account not found");
      return;
    }

    if (userdb.seal == true) {
      if (userdb.sealTimeStamp < userdb.unsealTimeStamp) {
        userdb.seal = false;
        userdb.loginAttamt = 0;
      }
    }
    let date = await timestamp("YYYY:MM:DD:HH:mm:ss");

    if (userdb.loginAttamt >= 5) {
      userdb.seal = true;
      userdb.sealTimeStamp = date;
      let unsealDate = unsealTime.unsealTimeStampHandler(date.split(":"));
      userdb.unsealTimeStamp = unsealDate;
      await userdb.save();
      res.status(200).json("account seale");
      return;
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
    const userdb = await User.findOneAndUpdate({ email: email });
    userdb.loginAttamt += 1;
    await userdb.save();

    res.status(404).json({ err: "somthing wrong" });
  }
};
