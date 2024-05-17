const Product = require("../../models/product.model")
const productHelper = require("../../helpers/product");

// [GET] /search
module.exports.index = async (req, res) => {
    const keyWord = req.query.keyword

    let newProduct = []

    if(keyWord){
        const regex = new RegExp(keyWord,"i")
        const products = await Product.find({
            title : regex,
            deleted : false,
            status : "active"
        })
        console.log(products);
        newProduct = productHelper.priceNewProducts(products)
    }

    res.render("client/pages/search/index",{
        pageTitle : "Ket qua tim kiem",
        keyWord : keyWord,
        products : newProduct
    })
}