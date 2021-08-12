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

    let request, parametr;
    if(data.name != "" && data.storage !=""){
        request = "name = ($1) and storage = ($2)";
        parametr = [data.name, data.storage]
        console.log(parametr)
    }
    else if(data.name != ""){
        request = "name = ($1)";
        parametr = [data.name]
    }
    else{
        request = "storage = ($1)";
        parametr = [data.storage]
    }
    



    const resp = (await db.query(`SELECT * from pills where ${request}`, parametr))
    const list = resp.rows
    res.json(list)
}))

// Обработчик ошибок
api.use(errorCatcher)

module.exports = api