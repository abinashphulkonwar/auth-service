const express = require("express");
const signUpController = require("../controller/signUp");
const userDuplicationError = require("../utils/mongo/userDuplication");
const loginController = require("../controller/login");
const logOutController = require("../controller/logOut");
const {
  signUpLimite,
  logInLimite,
  forgetPassword,
} = require("../utils/requestLimit");
const { sealAccount } = require("../controller/seal-account");
const changePasswordControler = require("../controller/change-password");
const forgetPasswordControler = require("../controller/forget-password");
const userConttroler = require("../controller/user");
const verifyEmailConttroler = require("../controller/email-verify");
const { userAuthentication } = require("../utils/authentication");
const {
  authValidationData,
  logInValidationData,
  changePasswordValidationData,
  forgetasswordValidationData,
} = require("../utils/authValidation");
const router = express.Router();

router.route("/email-verify").post(verifyEmailConttroler.verifyEmail);

router.route("/user").get(userAuthentication, userConttroler.getUser);

router
  .route("/signup")
  .post(authValidationData, signUpLimite, signUpController.signUpUser);

router
  .route("/login")
  .post(
    logInValidationData,
    logInLimite,
    loginController.logInUser,
    sealAccount
  );

router.route("/logout").post(logOutController.logOutUser);

router
  .route("/change-password")
  .post(
    userAuthentication,
    changePasswordValidationData,
    changePasswordControler.changePassword
  );

router
  .post("/forget-password")
  .post(
    forgetasswordValidationData,
    forgetPassword,
    forgetPasswordControler.forgetPassword
  );

module.exports = router;
