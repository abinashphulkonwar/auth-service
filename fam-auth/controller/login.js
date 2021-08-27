const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const timestamp = require("time-stamp");
const UserLog = require("../db/userLog");

exports.logInUser = async (req, res, next) => {
  let date = timestamp("YYYYMMDDHHmmss");
  const { email, password } = req.body;
  const userdb = await User.findOne({ email: email });
  if (!userdb) {
    res.json({ err: "account not found" });
    return;
  }
  if (userdb.seal == true) {
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

    userdb.userLogs.push(userLogsdb);
    await userLogsdb.save();

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
      userdb.loginAttamt += 0;
      await userdb.save();
      res.json({ token: jwtToken });
    } else {
      userdb.loginAttamt += 1;

      if (userdb.loginAttamt >= 5) {
        userdb.seal = true;
        userdb.sealTimeStamp = date;
        await userdb.save();
        res.status(200).json("account seale");
        return;
      }
      console.log(userdb);
      await userdb.save();
      res.status(404).json({ err: "email or password wrong" });
    }
  } catch (err) {
    console.log(err);

    res.status(404).json({ err: "somthing wrong" });
  }
};
