
module.exports.registerPost = (req,res,next) =>{
    if(!req.body.fullName){
        req.flash("error","Vui Long Nhap Ten")
        res.redirect("back")
        return;
    }
    if(!req.body.passWord){
        req.flash("error","Vui Long Nhap Mat Khau")
        res.redirect("back")
        return;
    }
    next()
}



module.exports.editPatch = (req,res,next) =>{
    if(!req.body.fullName){
        req.flash("error","Vui Long Nhap Ten")
        res.redirect("back")
        return;
    }
    if(!req.body.email){
        req.flash("error","Vui Long Nhap Email")
        res.redirect("back")
        return;
    }
    next()
}

module.exports.forgotPasswordPost = (req,res,next) =>{
    if(!req.body.email){
        req.flash("error","Vui Long Nhap Email")
        res.redirect("back")
        return;
    }
    next()
}

module.exports.resetPasswordPost = (req,res,next) =>{
    if(!req.body.passWord){
        req.flash("error","Vui Long Nhap mat khau")
        res.redirect("back")
        return;
    }

    if(!req.body.confirmPassword){
        req.flash("error","Vui Long Nhap xac nhan mat khau")
        res.redirect("back")
        return;
    }

    
    if(req.body.passWord != req.body.confirmPassword){
        req.flash("error","mat khau khong khop")
        res.redirect("back")
        return;
    }
    next()
}
