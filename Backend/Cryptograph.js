const crypto = require("crypto-js");

//####################  ECCRYPTION ########################
//function to encrypt password
module.exports = function encryptStoredPassword(curr_pwd,master_pwd){

//key is the SHA256 hashed master password of user
//key is the sha512 hash of user password
//SHA256 encryption of user password

var shaEnc = crypto.SHA256(master_pwd);
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
    enc_pwd : encStr,
    enc_pwd_String : encrypted.ciphertext.toString()
}

}


//####################  DECRYPTION ########################
//function to decrypt password
module.exports = function decryptStoredPassword(enc_pwd,master_pwd){
    //SHA256 algo encrypt to master password to use it as key

    var shaEnc = crypto.SHA256(master_pwd);
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
    return{
        decrpyt_pwd : decrytped.toString(crypto.enc.Utf8) //to be displayed in string format
    }
}





