
// Change Status

const buttonsChangeStatus = document.querySelectorAll('[button-change-status]')
const formChangeStatus = document.querySelectorAll('#form-change-status')
if(buttonsChangeStatus.length > 0){
    const formChangeStatus = document.querySelector('#form-change-status')
    const path = formChangeStatus.getAttribute("data-path")
    console.log(path);
    buttonsChangeStatus.forEach(button =>{
        button.addEventListener('click', () =>{
            const statusCurrent = button.getAttribute("data-status")
            
            const id = button.getAttribute('data-id')

            let statusChange = statusCurrent === "active"? "inactive" : "active"
            
            const action = path + `/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.action = action

            formChangeStatus.submit()
        })
    })
}


// Checkbox-Multi

const checkboxMulti = document.querySelector('[checkbox-multi]')
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name = 'checkall']")
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener('click',() =>{
        if(inputCheckAll.checked){
            inputIds.forEach(input =>{
                input.checked = true
            })
        }
        else{
            inputIds.forEach(input =>{
                input.checked = false
            })
        }
    })

    inputIds.forEach(input =>{
        input.addEventListener('click', () =>{
            const countChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked").length
            if(countChecked == inputIds.length){
                inputCheckAll.checked = true
            }
            else{
                inputCheckAll.checked = false
            }
        })
    })


}

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) =>{
        e.preventDefault()
        const checkboxMulti = document.querySelector('[checkbox-multi]')
        const inputsChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked")

        const typeChange = e.target.elements.type.value

        if(typeChange == "deleted-all"){
            const isConfirm = confirm("Ban xac nhan muon xoa")

            if(!isConfirm){
                return;
            }
        } 

        if(inputsChecked.length){
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach((input) =>{
                const id = input.value


                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value

                    ids.push(`${id}-${position}`)
                }
                else{
                    ids.push(id)
                }
                
            })
            inputIds.value = ids.join(", ")
            formChangeMulti.submit()
        }else{
            alert("chon it nhat 1 ban ghi")
        }
    })
}

// Delete Item

const buttonDelete = document.querySelectorAll("[button-delete]")

if(buttonDelete.length){
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(button =>{
        button.addEventListener("click", () =>{
            const isConfirm = confirm("Ban co chac muon xoa san pham nay")
            if(isConfirm){
                const id = button.getAttribute("data-id")
                const action =  `${path}/${id}?_method=DELETE`

                formDeleteItem.action = action
                formDeleteItem.submit()
            }
        })
    })
}
