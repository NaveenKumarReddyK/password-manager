//login authentication Routes
//registration Routes

const express = require('express');
const authRoutes = express.Router();
const User = require('../Models/User_Model');
const loginVD = require('../Data Validators/Login_Validator');
const regVD = require('../Data Validators/Registeration_Validator');
const CryptoJS = require('crypto-js');
const bcryptJS = require('bcryptjs');


// *********************************************************************************************************
// ********************************** ROUTE TO REGISTER AN USER  **********************************************
// *********************************************************************************************************
authRoutes.route("/register").post(function (req, res) {
    //check for errors in validation
    const regDataToBeValidated = req.body;
    const { isValid, reg_Errors } = regVD(regDataToBeValidated);
    //check if reg is invalid
    if (!isValid) {
        return res.status(400).json({
            Error: "Check your details for errors",
            Reg_Errors: reg_Errors,
            Body_Data: req.body
        });
    }
    //if no error proceed
    else {
        //check for user existence in database
        //use promises
        User.findOne({ email: req.body.reg_email }).then(reg_Res => {
            //if resoponse id there then user already exists
            if (reg_Res) {
                return res.status(400).json({
                    User_Exists: "User Already exists"
                });
            }
            //if not exists encrypt and save pwd
            else {
                //SHA256 hashed pwd 
                //reg_pwd is registered passwrod
                const sha256_pwd = CryptoJS.SHA256(req.body.reg_pwd);
                bcryptJS.genSalt(10, function (err, salt) {
                    if (err) {
                        return res.status(400).json({
                            Salt_Error: "Error while genrating salt"
                        });
                    }
                    else {
                        bcryptJS.hash(req.body.reg_pwd, salt, function (err, hashed_bcrypt_pwd) {
                            //error while hashing pwd
                            if (err) {
                                res.status(400).json({
                                    Reg_Hash_Error: "Unable to Hash Reg Password",
                                    bcryptJS_Error: err
                                });
                            }
                            //no error
                            else {
                                //new user data
                                const newUserData = new User({
                                    uname: req.body.reg_uname,
                                    email: req.body.reg_email,
                                    password_bcrypt: hashed_bcrypt_pwd,
                                    password_sha256: sha256_pwd
                                });

                                //save into database
                                newUserData.save().then((saveRes) => {
                                    console.log("Registered Sucessfuly");
                                    res.status(200).json({
                                        Messgae: "Registered Sucessfuly",
                                        User_Data: saveRes
                                    });
                                }).catch((err) => {
                                    console.log("Error whilesaving reg user to database");
                                    res.status(500).json({
                                        save_Error: "Error whilesaving reg user to database",
                                        reg_save_Error: err
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

// *********************************************************************************************************
// ********************************** ROUTE TO LOGIN AN USER  **********************************************
// *********************************************************************************************************

authRoutes.route('/login').get(function (req, res) {
    //validate login credentials
    const { isValid, login_Errors } = loginVD(req.body);
    //check for error
    if (!isValid) {
        res.status(400).json({
            login_Err_Msg: "Correct you login credentials",
            login_VD_Error: login_Errors
        });
    }
    //proceed if no error
    else {
        //check for user details
        const login_email = req.body.login_email;
        const login_pwd = req.body.login_pwd;
        //find the user
        User.findOne({ email: login_email }).then((login_Res) => {
            if (!login_Res) {
                return res.status(400).json({
                    Login_Error: "User not found"
                });
            }
            else {
                bcryptJS.compare(login_pwd, login_Res.password_bcrypt).then((bcryptJS_Res) => {
                    if (!bcryptJS_Res) {
                        res.status(400).json({
                            Pwd_Compare_Error: "Password Does Not Match"
                        });
                    }
                    else {
                        //******************* SESSION STORAGE
                        req.session.session_email = login_Res.email;

                        res.status(200).json({
                            Login_Ok: "Sucessfuly Logged In",
                            User_Data: login_Res
                        });
                    }
                });
            }
        }).catch((err) => {
            res.status(500).json({
                Find_Error: "Error While Finding User",
            });
        });
    }
});

// *********************************************************************************************************
// ********************************** USER LOGOUT ROUTE  **********************************************
// *********************************************************************************************************

authRoutes.route('/logout').post(function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(200).json({ LogoutMsg: "User already logged out" });
        }
        else {
            return res.status(200).json({ LogoutMsg: "Successfuly logged out" });
        }
    });
});

// *********************************************************************************************************
// ********************************** FINDING USER BY SESSION ID  **********************************************
// *********************************************************************************************************

authRoutes.route('/getinfo').get(function (req, res) {
    const user_email = req.session.session_email;
    User.findOne({ email: user_email }).then((info) => {
        res.status(200).json({
            UserInfo: info
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
});
//export module
module.exports = authRoutes;