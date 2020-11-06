import { Email } from '@material-ui/icons'
import mongodb from 'mongoose'
const Schema = mongodb.Schema

//define user schema

const userSchema = new Schema({
    uname: {
        type: String,
        default: "",
        required: true
    },
    email: {
        type: Email,
        default: "",
        required: true
    },
    password: {
        type: String,
        default: "",
        required: true
    }
}, {
    collection: "USER_COLLECTION"
})

module.exports = mongodb.model("UserModel", userSchema)