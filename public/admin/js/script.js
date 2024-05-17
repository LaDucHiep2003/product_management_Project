
// Button status
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){
    let url = new URL(window.location.href)

    buttonStatus.forEach(button =>{
        button.addEventListener("click",() =>{
            const status = button.getAttribute("button-status")
            
            if(status){
                url.searchParams.set("status",status)
            }else{
                url.searchParams.delete("status")
            }

            window.location.href = url.href
        })
    })
}
// End button status
// Form search

const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit",(e) =>{
        const keyword = e.target.elements.keyword.value

        if(keyword){
            url.searchParams.set("keyword",keyword)

        }
        else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}

// End Form Search

// PagiNation

const buttonsPagination = document.querySelectorAll("[button-pagination]")
if(buttonsPagination){
    let url = new URL(window.location.href)
    buttonsPagination.forEach((button) =>{
        button.addEventListener("click",() =>{
            const page = button.getAttribute("button-pagination")
            console.log(page);

            url.searchParams.set("page",page)
            
            window.location.href = url.href
        })
    })
}



// Show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    closeAlert = showAlert.querySelector("[close-alert]")


    setTimeout(() =>{
        showAlert.classList.add("alert-hidden")
    },time)

    closeAlert.addEventListener("click",() =>{
        showAlert.classList.add("alert-hidden")
    })
    
}

// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]")

const cencelImage = document.querySelector("[cencel-upload]")
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")

    uploadImageInput.addEventListener("change", (e) =>{
        const file = e.target.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
        }
        cencelImage.classList.remove("hidden")
    })

    cencelImage.addEventListener("click", () =>{
        uploadImageInput.value= "" 
        uploadImagePreview.src = ""
        cencelImage.classList.add("hidden")
    })
}



// End Upload Image

// Sort
const sort = document.querySelector("[sort]")
if(sort){
    const sortSelect = sort.querySelector("[sort-select]")
    const sortClear = sort.querySelector("[sort-clear]")
    let url = new URL(window.location.href)

    sortSelect.addEventListener("change", (e) =>{
        const value = e.target.value
        const [sortKey,sortValue] = value.split("-")
        url.searchParams.set("sortKey",sortKey)
        url.searchParams.set("sortValue",sortValue)
        
        window.location.href = url.href
    })

    // Xoa Sap Xep
    sortClear.addEventListener("click",()=>{
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")


        window.location.href = url.href
    })

    // The selected cho option
    const sortKey = url.searchParams.get("sortKey")
    const sortValue =  url.searchParams.get("sortValue")

    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`

        const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`)
        optionSelected.selected = true
    }

}

// End Sort


