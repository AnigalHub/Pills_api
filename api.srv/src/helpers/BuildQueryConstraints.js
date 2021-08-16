
//Создаем новый массив значений объекта (без пустых значений (''))
module.exports.GetArray = function GetArray(obj) {
    return Object.values(obj).filter(n => n)
}
//Создаем условия запроса
module.exports.CreateRequestConditions = function CreateRequestConditions(obj){
    let request = '';
    let arr_key =[]
    let arr_request = []
    console.log(obj)
    //создаем массив ключей объекта (которые без пустых значений (''))
    for (let key in obj) {
        if (obj[key]){
            arr_key.push(key)
        }
    }
    console.log(arr_key)
    //проходимся по массиву ключей и создаем строку в зависимости от длины массива и заменяем ',' на ' and '
    for (let i=0; i<arr_key.length;i++){
        arr_request.push(`${arr_key[i]} = $${i+1}`)
    }
    if(arr_request.length > 0)
        request = "where " + arr_request.join(' and ');
    return request;
}
