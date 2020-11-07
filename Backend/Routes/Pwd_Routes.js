//after user login 
//adding passwords
//displaying passwords
//update passowrd 
//delete password

const express = require('express');
const pwdRoutes = express.Router();
const Pwd = require('../Models/Password_Model');
const User = require('../Models/User_Model');
const pwdEnc = require('../HashFunctions/Pwd_Encrypt');

// *********************************************************************************************************
// ********************************** ROUTE TO ADD PASSWORD  ***********************************************    
// *********************************************************************************************************

pwdRoutes.route("/addpwd").post(function (req, res) {
    //get SHA256 hash of master_pwd
    //comp_email,comp_pwd ==> attributes
    // var masterPwd_SHA256;
    User.findOne({ email: req.session.session_email }).then((userRes) => {

        var masterPwd_SHA256 = userRes.password_sha256;

        //encrypt password using Triple DES
        var curr_pwd = req.body.comp_pwd;
        var curr_email = req.body.comp_email;
        var hashed_pwd = pwdEnc(curr_pwd, masterPwd_SHA256);
        console.log(hashed_pwd);

        //check if company email already present


        Pwd.findOne({ master_email: req.session.session_email, company_email: curr_email }).then((pwdRes) => {
            if (!pwdRes) {
                //if pwd not present then proceed

                //create new pwd data
                const newPwdData = new Pwd({
                    master_email: req.session.session_email,
                    company_email: curr_email,
                    password_tosave: hashed_pwd.enc_pwd_String,
                    master_password: masterPwd_SHA256
                });
                //add it into DB
                newPwdData.save().then((pwdSaved) => {
                    console.log("Password Saved Successfuly");
                    res.status(200).json({
                        Message: "Password Added Succesfuly",
                        Pwd_Data: pwdSaved
                    });
                }).catch((err) => {
                    res.status(500).json({
                        Pwd_Error: "Unable to save password"
                    });
                });

            } else {
                res.status(200).json({
                    Pwd_Msg: "Password already present"
                });
            }
        }).catch((err) => {
            res.status(400).json(err);
        });



    }).catch((err) => {
        res.status(500).json({
            Email_Error: "Unable to find email"
        });
    });

});

// *********************************************************************************************************
// ********************************** ROUTE TO DISPLAY PASSWORD  *******************************************    
// *********************************************************************************************************

pwdRoutes.route('/getpwds').get(function (req, res) {
    var loggedin_email = req.session.session_email;
    Pwd.find({ master_email: loggedin_email }).then((pwdRes) => {
        if (!pwdRes) {
            //user has no passwords stores
            res.status(200).json({
                Msg: "User Has No Passwords Stored"
            });
        }
        else {
            res.status(200).json({
                Pwds: pwdRes
            });
        }
    }).catch((err) => {
        res.status(400).json({
            Pwd_Error: "Error occured while finding user email"
        });
    });
});

// *********************************************************************************************************
// ********************************** ROUTE TO DELETE PASSWORD  ********************************************    
// *********************************************************************************************************

pwdRoutes.route('/delete').delete(function (req, res) {
    var master_email = req.session.session_email;
    var comp_email = req.body.comp_email;
    //delete pwd from database
    Pwd.findOneAndDelete({ master_email: master_email, company_email: comp_email }).then((delRes) => {
        if (!delRes) {
            res.status(500).json({
                Del_Error: "Unable to delete pwd"
            });
        }
        else {
            res.status(200).json({
                Del_Msg: "Sucessfuly Deleted Password"
            });
        }
    }).catch((delErr) => {
        res.status(400).json(delErr);
    });
});


// *********************************************************************************************************
// ********************************** UPDATE PASSWORD  *****************************************************  
// *********************************************************************************************************

pwdRoutes.route('/update').post(function (req, res) {
    var master_email = req.session.session_email;
    var comp_email = req.body.comp_email;
    var new_pwd = req.body.new_pwd;
    var masterPwd_SHA256 = req.body.masterPwd_SHA256;
    var new_enc_pwd = pwdEnc(new_pwd, masterPwd_SHA256);
    Pwd.findOneAndUpdate({ master_email: master_email, company_email: comp_email }, { $set: { password_tosave: new_enc_pwd.enc_pwd_String } }).then((updRes) => {
        if (!updRes) {
            res.status(400).json({
                Upd_Err: "Unable to update password"
            });
        }
        else {
            res.status(200).json({
                Upd_Msg: "Updated Sucessfuly",
                updRes
            });
        }
    }).catch((updError) => {
        res.status(500).json(updError);
    });
});
module.exports = pwdRoutes;

