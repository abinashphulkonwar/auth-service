const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserLog = Schema(
  {
    ip: {
      type: String,
    },
    route: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Userlog", UserLog);
