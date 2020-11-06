const crypto = require("crypto-js");
//key is the sha512 hash of user password
var key = "pbuYKcaZgo+nq/dWNW37usBM6lqQNGQ1KGA2yVP3xl8=";
var keyHex = crypto.enc.Utf8.parse(key);

console.log("keyhex", crypto.enc.Base64.parse(key).toString());
var message = "naveen";
var encrypted = crypto.TripleDES.encrypt(message, keyHex, {
  mode: crypto.mode.ECB,
  padding: crypto.pad.Pkcs7,
});

var encStr = encrypted.toString();
console.log("encStr", encrypted.ciphertext.toString());

var decrytped = crypto.TripleDES.decrypt(
  {
    ciphertext: crypto.enc.Base64.parse(encStr),
  },
  keyHex,
  {
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7,
  }
);

console.log("Decrytped", decrytped.toString(crypto.enc.Utf8));

//SHA256 encryption of user password
var shaEnc = crypto.SHA256("naveen");
console.log("SHA 256", shaEnc.toString(crypto.enc.Base64));
