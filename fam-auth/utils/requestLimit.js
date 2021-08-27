const rateLimit = require("express-rate-limit");

exports.signUpLimite = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many accounts created, please try again after an hour",
  handler: (req, res) => {
    res.status(429).json({
      err: "Too many accounts created, please try again after an hour",
    });
  },
});

exports.logInLimite = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many log in request from you, please try again after an hour",
  handler: (req, res) => {
    res.status(429).json({
      err: "Too many accounts created, please try again after an hour",
    });
  },
});

exports.forgetPassword = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many log in request from you, please try again after an hour",
  handler: (req, res) => {
    res.status(429).json({
      err: "Too many accounts created, please try again after an hour",
    });
  },
});
