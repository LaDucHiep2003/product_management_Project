

const User = require("../../models/user.model")
// [GET] /users/notFriend

module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id

    const users = await User.find({
        _id : {$ne : userId},
        deleted : false,
        status : "active"
    }).select("id avatar fullName")

    console.log(users);
  
    res.render("client/pages/users/not-friend",{
        pageTitle : "Danh sach nguoi dung",
        users : users
    })
}
