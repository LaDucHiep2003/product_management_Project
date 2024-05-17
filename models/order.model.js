

const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const orderCategorySchema = new mongoose.Schema(
    {
        // user_id : String,
        cart_id : String,
        userInfo : {
            fullName : String,
            phone : String,
            address : String
        },
        products : [
            {
                product_id : String,
                price : Number,
                discountPercentage : Number,
                quantity : Number
            }
        ]
        ,
        deleted : {
            type : Boolean,
            default : false
        },
        deletedAt : Date
    },{
        timestamps : true
    }
)

const ortherCategory = mongoose.model('Order', orderCategorySchema, 'orders')

module.exports = ortherCategory