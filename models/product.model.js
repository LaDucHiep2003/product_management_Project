const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
    {
        title : String,
        description : String,
        price : Number,
        discountPercentage : Number,
        stock : Number,
        thumbnail : String,
        status : String,
        featured : String,
        position : Number,
        product_category_id : {
            type : String,
            default : ""
        },
        createdBy : {
            account_id : String,
            createdAt :{
                type : Date,
                default : Date.now
            }
        },
        deleted : {
            type : Boolean,
            default : false
        },
        slug : {
            type : String,
            slug : "title",
            unique: true
        },
        deletedBy : {
            account_id : String,
            createdAt: Date
        },
        updatedBy : [
            {
                account_id : String,
                updatedAt: Date,
                
            }
        ],
        
    },{
        timestamps : true
    }
)

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product