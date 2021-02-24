function  UseFindIndexRequest(data,id) {
    var index = -1;
    data.forEach((item, i) => {
        if (item.requestId === id) {
            index = i
        }
    })
    return index
}

export default UseFindIndexRequest;