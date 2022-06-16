const mysql = require('mysql2');
const winston = require('winston');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 15000,
    enableKeepAlive: true,
    multipleStatements: true
});

db.on('connection', function (connection) {
    winston.info('Database Connected successfully!');
});

db.on('error', function (err) {
    winston.error(err);
});

module.exports = db;