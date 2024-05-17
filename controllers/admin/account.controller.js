
const Account = require("../../models/account.model")
const systemConfig = require('../../config/system')
const Role = require("../../models/role.model")

const md5 = require('md5');

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted : false
    }

    const records = await Account.find(find).select("-passWord -token")

    for (const record of records) {
        const role = await Role.findOne({
            _id : record.role_id,
            deleted : false
        })
        record.role = role
    }

    res.render("admin/pages/accounts/index",{
        pageTitle : "Danh Sach Tai Khoan",
        records : records
    })
}

// [GET] /admin/accounts
module.exports.create = async (req, res) => {
    const find = {
        deleted : false
    }

    const roles = await Role.find(find)
   
    res.render("admin/pages/accounts/create",{
        pageTitle : "Danh Sach Tai Khoan",
        roles : roles
    })
}

// [POST] /admin/accounts
module.exports.createPost = async (req, res) => {
    const emailExits = await Account.findOne({
        email : req.body.email,
        deleted : false
    })

    if(emailExits){
        req.flash("error","Email da ton tai")
        res.redirect("back")
    }
    else{
        req.body.passWord = md5(req.body.passWord)
   
        const record = new Account(req.body)
        await record.save()

        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
    
}

// [POST] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    
    const find = {
        _id : req.params.id,
        deleted : false
    }

    try{
        const data = await Account.findOne(find)
        const roles = await Role.find({
            deleted : false
        })

        res.render("admin/pages/accounts/edit",{
            pageTitle : "Chinh sua Tai Khoan",
            data : data,
            roles : roles
        })

    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    
    

    const emailExits = await Account.findOne({
        _id : {$ne  : req.params.id},
        email : req.body.email,
        deleted : false
    })

    if(emailExits){
        req.flash("error","Email da ton tai")
        res.redirect("back")
    }
    else{
        if(req.body.passWord){
            req.body.passWord = md5(req.body.passWord)
        }
        else{
            delete req.body.passWord
        }
        await Account.updateOne({_id : req.params.id},req.body)
        res.redirect("back")
    }
   
}