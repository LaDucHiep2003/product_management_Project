
module.exports.loginPost = (req,res,next) =>{
    if(!req.body.email){
        req.flash("error","Vui Long Nhap email")
        res.redirect("back")
        return;
    }

    if(!req.body.passWord){
        req.flash("error","Vui Long Nhap mat khau")
        res.redirect("back")
        return;
    }
    next()
}