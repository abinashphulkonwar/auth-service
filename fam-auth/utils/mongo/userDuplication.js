const User = require("../../db/user");

const BusinessAccount = require("../../db/Business");

class UserDublication {
  constructor(email, phonenumber) {
    this.email = email;
    this.phonenumber = phonenumber;
  }
  async validate(type) {
    try {
      let accountdb;
      if (type == "User") {
        accountdb = await User.findOne({ email: this.email }).select({
          _id: 1,
          email: 1,
        });
      } else if (type == "Business") {
        accountdb = await BusinessAccount.findOne({
          email: this.email,
          phonenumber: this.phonenumber,
        }).select({
          _id: 1,
          email: 1,
          phonenumber: 1,
        });
      }
      return accountdb;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = UserDublication;
