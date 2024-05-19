
const uploadToCloundinary = require("../../helpers/uploadClouldinary")
const Chat = require("../../models/chat.model")

module.exports = (res) => {

    const userId = res.locals.user.id
    const fullName = res.locals.user.fullName
     // Socket IO
     _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {

            let images = []
            for(const imageBuffer of data.images){
                const link = await uploadToCloundinary(imageBuffer)
                images.push(link)
            }

            // Luu vao database
            const chat = new Chat({
                user_id : userId,
                content : data.content,
                images : images
            })
            await chat.save()

            // tra data ve client
            _io.emit("SERVER_RETURN_MESSAGE",{
                fullName : fullName,
                user_id : userId,
                content : data.content,
                images : images
            })
        })

        // Typing
        socket.on("CLIENT_SEND_TYPING",async (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING",{
                fullName : fullName,
                user_id : userId,
                type : type
            })
        })
        socket.on("CLIENT_SEND_TYPING", async (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING",{
                fullName : fullName,
                user_id : userId,
                type : type
            })
        })

        // End Typing
        
    })
}