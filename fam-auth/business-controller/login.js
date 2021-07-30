const Business = require("../db/Business");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const timestamp = require("time-stamp");
const UserLog = require("../db/userLog");

exports.logInUser = async (req, res, next) => {
  let date = timestamp("YYYYMMDDHHmmss");
  const { email, password } = req.body;
  const businessdb = await Business.findOne({ email: email }).select({
    _id: 1,
    email: 1,
    phonenumber: 1,
    seal: 1,
    userLogs: 1,
    loginAttamt: 1,
    sealTimeStamp: 1,
  });
  if (!businessdb) {
    res.json("account not found");
    return;
  }
  if (businessdb.seal == true) {
    next();
    return;
  }
  try {
    // userdb.loginAttamtData.push({
    //   timestamp: date,
    //   ip: req.ip,
    // });
    const userLogsdb = await new UserLog({
      route: "login",
      ip: req.ip,
    });

    businessdb.userLogs.push(userLogsdb);
    await userLogsdb.save();

    let passwordVal = await bcrypt.compare(password, businessdb.passwordhash);
    if (passwordVal) {
      let jwtToken = await jwt.sign(
        {
          username: businessdb.username,
          email: businessdb.email,
          id: businessdb._id,
        },
        process.env.JWT_KEY
      );
      businessdb.loginAttamt = 0;
      await businessdb.save();
      res.json({ token: jwtToken });
    } else {
      businessdb.loginAttamt += 1;

      if (businessdb.loginAttamt >= 5) {
        businessdb.seal = true;
        businessdb.sealTimeStamp = date;
        await businessdb.save();
        res.status(200).json("account seale");
        return;
      }
      console.log(businessdb);
      await businessdb.save();
      res.status(404).json({ err: "email or password wrong" });
    }
  } catch (err) {
    console.log(err);

    res.status(404).json({ err: "somthing wrong" });
  }
};
