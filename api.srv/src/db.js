const { mainDB } = require('./cfg.json') // json файл - все по бд
const { Pool } = require('pg') // какой-то модуль для общения с базой
const pool = new Pool(mainDB) // объект = файл с данными по бд
module.exports = pool