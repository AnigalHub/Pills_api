// Маршрут
const api = require("express").Router()
// Промежуточные обработчики
const { asyncHandler, errorCatcher } = require("../middlewares")
// База
const db = require("./../db")
const buildQueryConstraints = require("../helpers/BuildQueryConstraints")

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

//Поиск по базе и вывод списка (всего или того, что ищем)
api.post('/', asyncHandler(async (req, res) => {
    const  data = req.body
    let request_parameters ={name:data.name, storage:data.storage,year:data.year}
    const resp = (await db.query(`SELECT * from pills ${buildQueryConstraints.CreateRequestConditions(request_parameters)}`, buildQueryConstraints.GetArray(request_parameters)))
    const list = resp.rows
    res.json(list)
}))

// Обработчик ошибок
api.use(errorCatcher)

module.exports = api