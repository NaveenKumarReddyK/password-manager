// const validateFunc = require('validator')
const validateFunc = require('validator');
//to check if object is empty or not
const isObjectEmpty = require('is-empty');
module.exports = function isRegDataValid(reg_data) {
  //initialize errors
  let reg_Errors = {};

  //check if inputs are empty
  var userName = validateFunc.isEmpty(reg_data.reg_uname)
    ? "" : reg_data.reg_uname;
  var userEmail = validateFunc.isEmpty(reg_data.reg_email)
    ? "" : reg_data.reg_email;
  var userPwd = validateFunc.isEmpty(reg_data.reg_pwd)
    ? "" : reg_data.reg_pwd;

  //check if username is empty
  if (validateFunc.isEmpty(userName)) {
    reg_Errors.uNameError = "User Name Should Not Be Empty";
  }

  //check if email is of correct format
  if (validateFunc.isEmpty(userEmail)) {
    reg_Errors.emailError = "Email Should Not Be Empty";
  } else if (!validateFunc.isEmail(userEmail)) {
    reg_Errors.emailError = "Please Correct Email Address";
  }

  //check for password length
  if (validateFunc.isEmpty(userPwd)) {
    reg_Errors.pwdError = "Password Should Not Be Empty";
  } else if (!validateFunc.isLength(userPwd, { min: 5, max: 8 })) {
    reg_Errors.pwdError = "Password Length Should Be In Between 5 and 8";
  }

  //return all the errors

  return {
    isValid: isObjectEmpty(reg_Errors),
    reg_Errors,
  };
};
