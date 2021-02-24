
function UseFindIndex(data, id) {
    var index = -1;
    data.forEach((item, i) => {
        if (item.userId === id) {
            index = i
        }
    })
    return index
}

export default UseFindIndex;


