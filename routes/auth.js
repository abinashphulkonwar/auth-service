const express = require("express");
const signUpController = require("../controller/signUp");
const loginController = require("../controller/login");
const logOutController = require("../controller/logOut");
const { signUpLimite, logInLimite } = require("../utils/requestLimit");
const {
  authValidationData,
  logInValidationData,
} = require("../utils/authValidation");
const router = express.Router();

router
  .route("/signup")
  .post(authValidationData, signUpLimite, signUpController.signUpUser);

router
  .route("/login")
  .post(logInValidationData, logInLimite, loginController.logInUser);

router.route("/logout").post(logOutController.logOutUser);

module.exports = router;
