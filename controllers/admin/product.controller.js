const Product = require("../../models/product.model")
const Account = require("../../models/account.model")

const filterStatusHelper = require('../../helpers/filterStatus')
const searchStatusHelper = require('../../helpers/search')
const paginationsHelper = require('../../helpers/pagination')
const systemConfig = require('../../config/system')
const ProductCategory = require("../../models/product-category.model")
const createTree = require("../../helpers/createTree")

// [GET] /admin/product
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query)

    let find = {
        deleted: false
    }
    if (req.query.status)
        find.status = req.query.status

    const objectSearch = searchStatusHelper(req.query)

    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }

    // Paginatin
    const countProducts = await Product.countDocuments(find)

    let objectPagination = paginationsHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        countProducts
    )

    // End Pagination

    // Sort
    let sort = {

    }
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    else{
        sort.position = "desc"
    }
    // End Sort

    const products = await Product.find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)
        .sort(sort)
    for (const product of products) {
        // Lay thong tin nguoi tao

        const user = await Account.findOne({
            _id : product.createdBy.account_id
        })

        if(user){
            product.accountFullname = user.fullName
        }
        // Lay thong tin nguoi cap nhat gan nhat
        const updatedBy = product.updatedBy.slice(-1)[0];
        if(updatedBy){
            const userUpdated = await Account.findOne({
                _id : updatedBy.account_id
            })

            updatedBy.accountFullname = userUpdated.fullName
        }
        
    }

    res.render("admin/pages/products/index", {
        pageTitle: "Trang Danh sach san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}
// [GET] /admin/status/change-status/:status/:id


module.exports.changeStatus = async (req, res) => {

    const status = req.params.status
    const id = req.params.id

    const updatedBy = {
        account_id : res.locals.user.id,
        updatedAt : new Date()
    }

    await Product.updateOne({ _id: id }, { status: status ,$push: { updatedBy : updatedBy}})
    req.flash('sucsess', 'Cap Nhat Trang Thai Thanh Cong');

    res.redirect("back")
}

// [GET] /admin/status/change-multi


module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    const updatedBy = {
        account_id : res.locals.user.id,
        updatedAt : new Date()
    }

    console.log(type);
    console.log(ids);
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { 
                status: "active" ,
                $push: { updatedBy : updatedBy}
            })
            req.flash('sucsess', `Cap Nhat Trang Thai Thanh Cong ${ids.length} San Pham`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { 
                status: "inactive" ,
                $push: { updatedBy : updatedBy}
            })
            req.flash('sucsess', `Cap Nhat Trang Thai Thanh Cong ${ids.length} San Pham`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deletedBy: {
                    account_id : res.locals.user.id,
                    deletedAt : new Date()
                } 

            })
            req.flash('sucsess', `Da Xoa Thanh Cong ${ids.length} San Pham`);
            break;
        case "change-position":
            console.log(ids);
            for (const item of ids) {
                let [id, position] = item.split("-")

                position = parseInt(position)
                await Product.updateOne({ _id: { $in: id } }, {
                    position: position,
                    $push: { updatedBy : updatedBy}
                })
            }
            req.flash('sucsess', `Da Doi Vi TRi Thanh Cong ${ids.length} San Pham`);
            break;
        default:
            break;
    }
    res.redirect("back")
}

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id

    // await Product.deleteOne({_id : id})
    await Product.updateOne({ _id: id }, 
        { 
            deleted: true, 
            deletedBy: {
                account_id : res.locals.user.id,
                deletedAt : new Date()
            } 
        })
    req.flash('sucsess', `Da Xoa  Thanh Cong San Pham`);
    res.redirect("back")
}

module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    const category = await ProductCategory.find(find)
    const newCategory = createTree.tree(category)

    res.render("admin/pages/products/create", {
        pageTitle: "Trang Them Moi san pham",
        category : newCategory
    })
}

module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments()
        req.body.position = countProducts + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    req.body.createdBy = {
        account_id : res.locals.user.id
    }
   
    const product = new Product(req.body)

    await product.save()

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted : false,
            _id : req.params.id
        }
    
        const category = await ProductCategory.find({
            deleted: false
        })
        const newCategory = createTree.tree(category)

        const product = await Product.findOne(find)
        res.render("admin/pages/products/edit", {
            pageTitle: "Trang Chinh Sua san pham",
            product : product,
            category : newCategory
        })
    } catch (error) {
        
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
    
}

// [PATCH] /admin/products/edit/id
module.exports.editPatch = async (req, res) => {
   
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)



    req.body.position = parseInt(req.body.position)
    try {

        const updatedBy = {
            account_id : res.locals.user.id,
            updatedAt : new Date()
        }

        await Product.updateOne({_id : req.params.id},{
            ...req.body,
            $push: { updatedBy : updatedBy}
        })
        req.flash('sucsess', 'Cap Nhat Thanh Cong');
    } catch (error) {
        
    }
   

    res.redirect(`back`)
}

// [GET] /admin/products/detail/id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted : false,
            _id : req.params.id
        }

        const product = await Product.findOne(find)
        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product : product
        })
    } catch (error) {
        
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
    
}

