const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater');
const generate = require("../helpers/generate")

mongoose.plugin(slug);
const accountSchema = new mongoose.Schema(
    {
        fullName : String,
        email : String,
        passWord : String,
        token : {
            type : String,
            default : generate.generateRandomString(20)
        },
        phone : String,
        avatar : String,
        role_id : String,
        status : String,
        deleted : {
            type : Boolean,
            default : false
        },
        deletedAt : Date
    },{
        timestamps : true
    }
)

const Account = mongoose.model('Account', accountSchema, 'accounts')

module.exports = Account