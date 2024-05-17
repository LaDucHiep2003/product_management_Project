
const Product = require("../../models/product.model")
const productHelper = require("../../helpers/product");
const productCategoryHelper = require("../../helpers/products-category");
const ProductCategory = require("../../models/product-category.model");
const productCategory = require("../../models/product-category.model");

// [GET] /product

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status : "active",
        deleted : false
    }).sort({position : "desc"})

    const newProduct = productHelper.priceNewProducts(products);

    res.render("client/pages/products/index",{
        pageTitle : "Danh sach san pham",
        products : newProduct
    })
}

// [GET] /product/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted : false,
            slug: req.params.slugProduct,
            status : "active"
        }



        const product = await Product.findOne(find)

        if(product.product_category_id){
            const category = await productCategory.findOne({
                _id : product.product_category_id,
                status : "active",
                deleted : false
            })

            product.category = category
        }

        product.priceNew = productHelper.priceNewProduct(product)
        res.render("client/pages/products/detail",{
            pageTitle : "Chi tiet san pham",
            product : product
        })
    } catch (error) {
        
        res.redirect(`/products`)
    }
   
}

// [GET] /product/:slugcategory
module.exports.category = async (req, res) => {

    const category = await ProductCategory.findOne({
        slug : req.params.slugCategory,
        status : "active",
        deleted : false
    })



    const lishSubCategory = await productCategoryHelper.getSubCategory(category.id)

    const lishSubCategoryId = lishSubCategory.map(item => item.id)
    const products = await Product.find({
        product_category_id : {$in : [category.id, ...lishSubCategoryId]},
        deleted : false
    }).sort({position : "desc"})

    const newProduct = productHelper.priceNewProducts(products);

    res.render("client/pages/products/index",{
        pageTitle : category.title,
        products : newProduct
    })
    
}