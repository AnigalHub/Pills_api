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


// Обработчик ошибок
api.use(errorCatcher)

module.exports = api