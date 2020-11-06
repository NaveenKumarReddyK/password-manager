const mongodb = require('mongoose');
const Schema = mongodb.Schema;

//Schema for storing password
const pwdSchema = new Schema({
    email: {
        type: String,
        default: "",
        required: true,
    },
    //this password is the password to save 
    password_tosave: {
        type: String,
        default: "",
        required: true,
    },
    //this master password is used for encryption and decryption of saved
    password_sha256: {
        type: String,
        default: "",
        required: true
    }
},
    {
        collection: "PWD_COLLECTION"
    }
);

//export shema
module.exports = mongodb.model("PwdModel", pwdSchema);