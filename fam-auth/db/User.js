const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    emailVerify: {
      type: Boolean,
      default: false,
    },
    passwordhash: {
      type: String,
      required: true,
    },
    iamge: {
      type: String,
      required: false,
    },
    lastseen: {
      type: String,
    },
    sealTimeStamp: {
      type: String,
    },
    seal: {
      type: Boolean,
    },
    loginAttamt: {
      type: Number,
      default: 0,
    },
    loginAttamtData: {
      type: Array,
    },
    userLogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Userlog",
      },
    ],
    passwordKey: {
      type: String,
    },
    bio: {
      type: Map,
      of: String,
    },
    location: {
      type: Map,
      of: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    savedPost: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    follow: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
