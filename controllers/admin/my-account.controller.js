
const Account = require("../../models/account.model")

const md5 = require('md5');

// [GET] /admin/my-account
module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index",{
        pageTitle : "Trang thong tin ca nhan"
    })
}

// [GET] /admin/my-account
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit",{
        pageTitle : "Trang thong tin ca nhan"
    })
}

// [PATCH] /admin/my-account
module.exports.editPatch =  async (req, res) => {
    const id = res.locals.user.id
    const emailExits = await Account.findOne({
        _id : {$ne  : id},
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
        await Account.updateOne({_id : id},req.body)
        res.redirect("back")
    }
}