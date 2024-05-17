
const Account = require("../../models/account.model")
const systemConfig = require('../../config/system')
const md5 = require('md5');


// [GET] /admin/auth/login
module.exports.login = (req, res) => {

    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    }
    else{
        res.render("admin/pages/auth/login",{
            pageTitle : "Dang nhap"
        })
    }

    
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email
    const passWord = req.body.passWord
    
    const user = await Account.findOne({
        email : email,
        deleted : false
    })

    if(!user){
        req.flash("error","email khong ton tai")
        res.redirect("back")
        return
    }

    if(md5(passWord) != user.passWord){
        req.flash("error","Mat khau khong chinh xac")
        res.redirect("back")
        return
    }

    if(user.status == "inactive"){
        req.flash("error","Tai khoan da bi khoa")
        res.redirect("back")
        return
    }

    res.cookie("token", user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token")

    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}