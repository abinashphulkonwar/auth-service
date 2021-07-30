const Business = require("../db/Business");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const timeStamp = require("time-stamp");

exports.sealAccount = async (req, res, next) => {
  try {
    let date = timeStamp("YYYYMMDDHHmmss");
    const { email, password } = req.body;
    const businessdb = await Business.findOne({ email: email }).select({
      _id: 1,
      username: 1,
      email: 1,
      sealTimeStamp: 1,
      passwordhash: 1,
      seal: 1,
    });
    if (+date - +businessdb.sealTimeStamp >= 30) {
      businessdb.seal = false;
      businessdb.loginAttamt = 0;

      let passwordVal = await bcrypt.compare(password, businessdb.passwordhash);
      if (passwordVal) {
        let jwtToken = await jwt.sign(
          {
            email: businessdb.email,
            id: businessdb._id,
          },
          process.env.JWT_KEY
        );
        await businessdb.save();
        res.json({ token: jwtToken });
      } else {
        res.status(404).json({ err: "email or password wrong" });
      }
    } else {
      res.json({ err: "your account seal" });
    }
  } catch (err) {
    console.log("hiiiiiii");
    console.log(err);
    res.json({ err: "somthing wrong" });
  }
};
