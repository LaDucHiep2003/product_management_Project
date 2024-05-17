
let cnt = 0
const createTree = (arr, parentId = "") => {
    const tree = []

    arr.forEach(item => {
        if (item.parent_id == parentId) {
            cnt++
            const newItem = item
            newItem.index = cnt
            const childrent = createTree(arr, item.id)
            if (childrent.length > 0) {
                newItem.childrent = childrent
            }
            tree.push(newItem)
        }
    })
    return tree
}

module.exports.tree = (arr, parentId = "") => {
    cnt = 0
    const tree = createTree(arr,parentId)
    return tree
}