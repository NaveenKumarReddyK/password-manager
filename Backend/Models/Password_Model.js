import mongodb from 'mongoose'
const Schema = mongodb.Schema;

//Schema for storing password
const pwdSchema = new Schema({
    email: {
        type: String,
        default: "",
        required: true,
    },
    password: {
        type: String,
        default: "",
        required: true,
    }
},
    {
        collection: "PWD_COLLECTION"
    }
)

//export shema
module.exports = mongodb.model("PwdModel", pwdSchema)