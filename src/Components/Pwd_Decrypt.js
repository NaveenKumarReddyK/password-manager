const crypto = require('crypto-js');

//####################  DECRYPTION ########################
//function to decrypt password
module.exports = function decryptStoredPassword(enc_pwd, master_pwd) {
  //SHA256 algo encrypt to master password to use it as key

  // password already encrypted using SHA256  
  var shaEnc = master_pwd;
  // console.log("SHA 256", shaEnc.toString(crypto.enc.Base64));
  var key = shaEnc.toString(crypto.enc.Base64);
  var keyHex = crypto.enc.Utf8.parse(key);

  var decrytped = crypto.TripleDES.decrypt(
    {
      ciphertext: crypto.enc.Base64.parse(enc_pwd),
    },
    keyHex,
    {
      mode: crypto.mode.ECB,
      padding: crypto.pad.Pkcs7,
    }
  );

  //   console.log("Decrytped", decrytped.toString(crypto.enc.Utf8));
  return {
    decrpyt_pwd: decrytped.toString(crypto.enc.Utf8), //to be displayed in string format
  };
};