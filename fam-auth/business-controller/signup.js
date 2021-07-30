const Business = require("../db/Business");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserDublication = require("../utils/mongo/userDuplication");

exports.signUpBussinessAccount = async (req, res, next) => {
  const { email, password, phonenumber } = req.body;
  try {
    const findBusinessObj = await new UserDublication(email, phonenumber);
    const findBusiness = await findBusinessObj.validate("Business");

    if (findBusiness) {
      res.status(404).json({ err: "email or phone number already used" });
      return;
    }

    const passwordhash = await bcrypt.hash(password, 12);

    const businessdb = await new Business({ email, passwordhash, phonenumber });
    await businessdb.save();

    const jwtToken = await jwt.sign(
      {
        email: businessdb.email,
        id: businessdb._id,
        number: businessdb.phonenumber,
      },
      process.env.JWT_KEY
    );

    res.json({ token: jwtToken });
  } catch (err) {
    console.log(err.message);

    res.status(404).json({ err: "somthing wrong" });
  }
};
