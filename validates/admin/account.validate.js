
module.exports.createPost = (req,res,next) =>{
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
