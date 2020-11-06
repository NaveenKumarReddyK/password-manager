// const validateFunc = require('validator')
import validateFunc from "validator";

module.exports = function isLoginDataValid(login_data) {
  //initialize errors
  const login_Errors = {};

  var userEmail = !validateFunc.isEmpty(login_data.login_email)
    ? login_data.login_email
    : "";
  var userPwd = !validateFunc.isEmpty(login_data.login_pwd)
    ? login_data.login_pwd
    : "";

  //check if email is of correct format
  if (!validateFunc.isEmpty(userEmail)) {
    login_Errors.emailError = "Email Should Not Be Empty";
  } else if (!validateFunc.isEmail(userEmail)) {
    login_Errors.emailError = "Please Correct Email Address";
  }

  //check for password length
  if (!validateFunc.isEmpty(userPwd)) {
    login_Errors.pwdError = "Password Should Not Be Empty";
  } else if (!validateFunc.isLenght(userPwd, 0, 8)) {
    login_Errors.pwdError = "Password Length Should Be In Between 0 and 8";
  }

  //return all the errors
  return {
    isValid: !validateFunc.isEmpty(login_Errors),
    login_Errors,
  };
};
