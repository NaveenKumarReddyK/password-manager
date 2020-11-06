// const validateFunc = require('validator')
import validateFunc from "validator";

module.exports = function isRegDataValid(reg_data) {
  //initialize errors
  const reg_Errors = {};

  //check if inputs are empty
  var userName = !validateFunc.isEmpty(reg_data.reg_uname)
    ? reg_data.reg_uname
    : "";
  var userEmail = !validateFunc.isEmpty(reg_data.reg_email)
    ? reg_data.reg_email
    : "";
  var userPwd = !validateFunc.isEmpty(reg_data.reg_pwd)
    ? reg_data.reg_pwd
    : "";

  //check if username is empty
  if (!validateFunc.isEmpty(userName)) {
    reg_Errors.uNameError = "User Name Should Not Be Empty";
  }

  //check if email is of correct format
  if (!validateFunc.isEmpty(userEmail)) {
    reg_Errors.emailError = "Email Should Not Be Empty";
  } else if (!validateFunc.isEmail(userEmail)) {
    reg_Errors.emailError = "Please Correct Email Address";
  }

  //check for password length
  if (!validateFunc.isEmpty(userPwd)) {
    reg_Errors.pwdError = "Password Should Not Be Empty";
  } else if (!validateFunc.isLenght(userPwd, 0, 8)) {
    reg_Errors.pwdError = "Password Length Should Be In Between 0 and 8";
  }

  //return all the errors
  return {
    isValid: !validateFunc.isEmpty(reg_Errors),
    reg_Errors,
  };
};
