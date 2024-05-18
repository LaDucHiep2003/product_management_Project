

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form")

if(formSendData){
    formSendData.addEventListener("submit", (e) =>{
        e.preventDefault()

        const content = e.target.elements.content.value
        console.log(content);
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE",content)
            e.target.elements.content.value = ""
        }
    })
}

// SERVER RETURN MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id")
    const body = document.querySelector(".chat .inner-body")
    const div = document.createElement("div")

    let htmlFullName = ""


    if(myId == data.user_id){
        div.classList.add("inner-outgoing")
    }else{
        htmlFullName = `<div class = "inner-name"> ${data.fullName}</div>`
        div.classList.add("inner-incoming")
    }


    div.innerHTML = `
        ${htmlFullName}
        <div class = "inner-content"> ${data.content}</div>
    `

    body.appendChild(div)
    body.scrollTop = bodyChat.scrollHeight
})

// Scroll Chat to bottm

const bodyChat = document.querySelector(".chat .inner-body")
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight
}
