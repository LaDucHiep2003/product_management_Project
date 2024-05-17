
module.exports.createPost = (req,res,next) =>{
    if(!req.body.title){
        req.flash("error","Vui Long Nhap Tieu De")
        res.redirect("back")
        return;
    }
    next()
}