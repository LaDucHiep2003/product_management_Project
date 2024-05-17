

const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema(
    {
        title : String,
        description : String,
        parent_id : {
            type : String,
            default : ""
        },
        thumbnail : String,
        status : String,
        position : Number,
        deleted : {
            type : Boolean,
            default : false
        },
        slug : {
            type : String,
            slug : "title",
            unique: true
        },
        deletedAt : Date
    },{
        timestamps : true
    }
)

const productCategory = mongoose.model('ProductCategory', productCategorySchema, 'products-category')

module.exports = productCategory