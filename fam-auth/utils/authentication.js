const jwt = require("jsonwebtoken");


exports.userAuthentication = async (req, res, next) => {
  try {
    const tokenHeader = await req.get("Authorization");
    const token = tokenHeader.split(" ")[1];
    if (!token) {
      res.json({ err: "not login" });
      return;
    }
    console.log(token);
    const jwtToken = await jwt.verify(token, process.env.JWT_KEY);
    req.user = jwtToken;
    next();
  } catch (err) {
    console.log(err);
    res.json({ err: "somthing wrong" });
  }
};
