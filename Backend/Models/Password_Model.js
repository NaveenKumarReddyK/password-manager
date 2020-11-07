const mongodb = require('mongoose');
const Schema = mongodb.Schema;

//Schema for storing password
const pwdSchema = new Schema({
    //email used while registering
    master_email: {
        type: String,
        default: "",
        required: true,
    },
    //email used for saving
    company_email: {
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
    master_password: {
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
module.exports = mongodb.model("Pwd", pwdSchema);