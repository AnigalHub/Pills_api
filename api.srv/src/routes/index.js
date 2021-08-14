// Маршрут
const api = require("express").Router()
// Промежуточные обработчики
const { asyncHandler, errorCatcher } = require("../middlewares")
// База
const db = require("./../db")


//Получить список из базы
api.get('/', asyncHandler(async (req, res) => {
    const list = (await db.query('SELECT * FROM pills order by name')).rows
    res.json(list)
}))
//Добавить в базу
api.post('/add', asyncHandler(async (req, res) => {
    const data = req.body
    await db.query('INSERT INTO pills (name, number, storage, year) values ($1, $2, $3, $4)', [data.name, data.number, data.storage, data.year])
    res.end()
}))
//Удалить элемент из бд
api.post('/delete', asyncHandler(async (req, res) => {
    const data = req.body
    await db.query("DELETE FROM pills WHERE id = $1", [data.id])
    res.end()
}))

//Поиск по базе
api.post('/search', asyncHandler(async (req, res) => {
    const  data = req.body
/*
   let request, parametr;
   if(data.name != "" && data.storage !=""){
       request = "name = ($1) and storage = ($2)";
       parametr = [data.name, data.storage]
       console.log(parametr)
       console.log(request )
   }

  else if(data.name != ""){
       request = "name = ($1)";
       parametr = [data.name]
       console.log(parametr)
   }
   else{
       request = "storage = ($1)";
       parametr = [data.storage]
       console.log(parametr)
   }
*/

    let request_parameters ={name:data.name, storage:data.storage,year:data.year}
    let arr = [];
    let request;

    //Создаем новый массив значений объекта (без пустых значений (''))
    function FillArray(obj) {
        arr = Object.values(obj).filter(n => n)
        return arr
    }
    //Создаем условия запроса
    function CreateRequestConditions(obj){
        let arr_key =[]
        let arr_request = []

        //создаем массив ключей объекта (которые без пустых значений (''))
        for (let key in obj) {
            if (obj[key] != ""){
                arr_key.push(key)
            }
        }
        //проходимся по массиву ключей и создаем строку в зависимости от длины массива и заменяем , на and
        for (let i=0; i<arr_key.length;i++){
            if(arr[i] != "" && arr[i+1] != ""){
                let a = `${arr_key[i]} = ($${i+1})`;
                arr_request.push(a)
                request = arr_request.join().split(',').join(' and ');
            }
        }
        return request;
    }
    //console.log(FillArray(request_parameters))
    //console.log(CreateRequestConditions(request_parameters))


   /* let arr = Object.values(obj).filter(n => n)
    console.log(arr)
    let arr_key =[]
    let arr_request = []

    for (let key in obj) {
       if (obj[key] != ""){
           arr_key.push(key)
       }
    }
    for (let i=0; i<arr_key.length;i++){
        if(arr[i] != "" && arr[i+1] != ""){
            let a = `${arr_key[i]} = ($${i+1})`;
            arr_request.push(a)
            request = arr_request.join().split(',').join(' and ');
        }
    }
    console.log(request)
    console.log("новый")
    console.log(arr)
    console.log("____________")
*/


    const resp = (await db.query(`SELECT * from pills where ${CreateRequestConditions(request_parameters)}`, FillArray(request_parameters)))
    const list = resp.rows
    res.json(list)
}))

// Обработчик ошибок
api.use(errorCatcher)

module.exports = api