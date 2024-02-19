const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Luciano',
    password: 'beluca18',
    database: 'saboroso'
})

module.exports = connection;