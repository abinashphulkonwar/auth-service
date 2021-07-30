const express = require("express");
const { signUpBussinessAccount } = require("../business-controller/signup");
const {
  authBusinessValidation,
  logInBusinessValidation,
} = require("../utils/authValidation");
const { signUpLimite } = require("../utils/requestLimit");
const router = express.Router();

router
  .route("/signup")
  .post(authBusinessValidation, signUpLimite, signUpBussinessAccount);

router.route("/login").post(logInBusinessValidation);

module.exports = router;
