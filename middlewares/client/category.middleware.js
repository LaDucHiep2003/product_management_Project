const ProductCategory = require("../../models/product-category.model")
const createTree = require("../../helpers/createTree")

module.exports.category = async (req,res,next) =>{
    let find = {
        deleted: false
    }
    
    const productCategory = await ProductCategory.find(find)
    const newProductCategory = createTree.tree(productCategory)

    res.locals.layoutProductCategory = newProductCategory
    next()

}