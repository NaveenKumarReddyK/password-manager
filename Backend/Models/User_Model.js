const mongodb = require('mongoose');
const Schema = mongodb.Schema;

//define user schema

const userSchema = new Schema({
    uname: {
        type: String,
        default: "",
        required: true
    },
    email: {
        type: String,
        default: "",
        required: true
    },
    //this password is used for authentication 
    password_bcrypt: {
        type: String,
        default: "",
        required: true
    },
    //this master password is used as key for encryption and decryption of saved
    password_sha256: {
        type: String,
        default: "",
        required: true
    }
}, {
    collection: "USER_COLLECTION"
});

module.exports = mongodb.model("User", userSchema);