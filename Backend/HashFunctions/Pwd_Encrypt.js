const crypto = require("crypto-js");

//####################  ECCRYPTION ########################
//function to encrypt password
module.exports = function encryptStoredPassword(curr_pwd, master_pwd) {
  //key is the SHA256 hashed master password of user
  //key is the sha512 hash of user password
  //SHA256 encryption of master password

  // password already encrypted using SHA256  
  var shaEnc = master_pwd;
  // console.log("SHA 256", shaEnc.toString(crypto.enc.Base64));
  var key = shaEnc.toString(crypto.enc.Base64);
  var keyHex = crypto.enc.Utf8.parse(key);

  // console.log("keyhex", crypto.enc.Base64.parse(key).toString());

  var message = curr_pwd;
  //encryption using triple DES in ECB mode
  var encrypted = crypto.TripleDES.encrypt(message, keyHex, {
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7,
  });
  var encStr = encrypted.toString();

  // console.log("encStr", encrypted.ciphertext.toString());

  return {
    enc_pwd: encStr.toString(),
    enc_pwd_String: encrypted.ciphertext.toString(),
  };
};


