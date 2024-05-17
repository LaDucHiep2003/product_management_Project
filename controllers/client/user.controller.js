
const User = require("../../models/user.model")
const md5 = require('md5');
const generateHelper = require("../../helpers/generate")
const ForgotPassword = require("../../models/forgot-password.model")
const Cart = require("../../models/cart.model")
const sendMailHeplper = require("../../helpers/sendMail")
// [GET] /user/register

module.exports.register = async (req, res) => {
  
    res.render("client/pages/user/register",{
        pageTitle : "Dang ky tai khoan",
    })
}

// [POST] /user/register

module.exports.registerPost = async (req, res) => {
    const exisEmail = await User.findOne({
        email : req.body.email
    })

    if(exisEmail){
        req.flash("error","Email da ton tai")
        res.redirect("back")
        return;
    }

    req.body.passWord = md5(req.body.passWord)
    const user = new User(req.body)
    await user.save()

    res.cookie("tokenUser",user.tokenUser)

    res.redirect("/")
}

// [GET] /user/login

module.exports.login = async (req, res) => {
  
    res.render("client/pages/user/login",{
        pageTitle : "Dang nhap",
    })
}


// [POST] /user/login
module.exports.loginPost = async (req, res) => {

    const email = req.body.email
    const passWord = req.body.passWord

    const user = await User.findOne({
        email : email,
        deleted : false
    })

    if(!user){
        req.flash("error","Email khong ton tai")
        res.redirect("back")
        return;
    }

    if(md5(passWord) !== user.passWord){
        req.flash("error","Sai mat khau")
        res.redirect("back")
        return;
    }

    if(user.status == "inactive"){
        req.flash("error","Tai khoan da bi khoa")
        res.redirect("back")
        return;
    }

    res.cookie("tokenUser",user.tokenUser)
    await Cart.updateOne({
        _id : req.cookies.cartId
    },{
        user_id : user.id
    })

    res.redirect("/")
}

// [GET] /user/logout

module.exports.logout = async (req, res) => {
    
    res.clearCookie("tokenUser")
    res.clearCookie("cartId")
    
    res.redirect("/")
}


// [GET] /user/password/forgot

module.exports.forgotPassword = async (req, res) => {
  
    res.render("client/pages/user/forgot-password",{
        pageTitle : "Quen mat khau",
    })
}


// [POST] /user/password/forgot

module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email

    const user = await User.findOne({
        email : email,
        deleted : false
    })

    if(!user){
        req.flash("error","Email khong ton tai")
        res.redirect("back")
        return;
    }

    // Luu thong tin vao data base
    const otp = generateHelper.generateRandomNumber(8)

    const objectForgotPassword = {
        email : email,
        otp : otp,
        expireAt : Date.now()
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword)
    forgotPassword.save()


    // Neu ton tai email thi gui ma opt qua email
    const subject = "Mã opt xác minh lấy lại mật khẩu"
    const html = `Mã otp lấy lại mật khẩu là <b>${otp} </b>. Thời hạn sử dụng là 3 phút.`

    sendMailHeplper.sendMail(email,subject, html)
    res.redirect(`/user/password/otp?email=${email}`)
}

// [GET] /user/password/otp

module.exports.otpPassword = async (req, res) => {
    const email = req.query.email
    res.render("client/pages/user/otp-password",{
        pageTitle : "Nhap ma opt",
        email : email
    })
}

// [POST] /user/password/otp

module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email
    const otp = req.body.otp

    const result = await ForgotPassword.findOne({
        email : email,
        otp : otp
    })

    if(!result){
        req.flash("error","Email khong ton tai")
        res.redirect("back")
        return;
    }
    const user = await User.findOne({
        email : email
    })

    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/user/password/reset")
}

// [GET] /user/password/reset

module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password",{
        pageTitle : "Nhap ma opt",
    })
}

// [POST] /user/password/reset

module.exports.resetPasswordPost = async (req, res) => {
   const password = req.body.passWord

   const tokenUser = req.cookies.tokenUser
   
   await User.updateOne({
    tokenUser : tokenUser
   },{
    passWord : md5(password)
   })
   res.redirect("/")
}

// [GET] /user/info

module.exports.info = async (req, res) => {

  
    res.render("client/pages/user/info",{
        pageTitle : "Thong tin tai khoan",
    })
}
