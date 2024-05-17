const Product = require("../../models/product.model")
const productHelper = require("../../helpers/product");

// [GET] /
module.exports.index = async (req, res) => {
    // Lay san pham noi bat
    const productFeatured = await Product.find({
        deleted : false,
        featured : "1",
        status : "active"
    })

    const newproductFeatured = productHelper.priceNewProducts(productFeatured)

    // Lay san pham moi nhat

    const productNew = await Product.find({
        deleted : false,
        status : "active"

    }).sort({position : "desc"})

    const newProductNew = productHelper.priceNewProducts(productFeatured)

    res.render("client/pages/home/index",{
        pageTitle : "Trang chu",
        productFeatured : newproductFeatured,
        productNew : newProductNew
    })
}