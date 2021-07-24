// Маршрут
const api = require("express").Router()
// Промежуточные обработчики
const { asyncHandler, errorCatcher } = require("../middlewares")
// База
const db = require("./../db")


//Получить список из базы
api.get('/', asyncHandler(async (req, res) => {
    const list = (await db.query('SELECT * FROM pills')).rows
    res.json(list)
}))
//Добавить в базу
api.post('/add', asyncHandler(async (req, res) => {
    const data = req.body
    await db.query('INSERT INTO pills (name, id, number, storage, year) values ($1, $2, $3, $4, $5)', [data.name, data.id, data.number, data.storage, data.year])
    res.end()
}))
// Обработчик ошибок
api.use(errorCatcher)

module.exports = api