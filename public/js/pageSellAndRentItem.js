const order = document.getElementById("order")

let objQuery = {}

order.addEventListener("change", (event) => {
    const arryQuery = location.search.slice(1, -1).split("&")
    arryQuery.forEach(item => {
        item = item.split("=")
        objQuery[item[0]] = item[1]
    })

    if(order.value == "j") {
        objQuery['sort'] = "new"
    }else if(order.value == "g") {
        objQuery['sort'] = "unnew"
    }

    console.log(objQuery)

    let query = '?'
    for(itemQuery in objQuery) {
        console.log(itemQuery)
        query += `${itemQuery}=${objQuery[itemQuery]}&`
    }
    location.search = query
})