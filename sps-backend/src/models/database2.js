'use strict';

const mysql = require("mysql2/promise"); // async await 사용위해 mysql2 사용
const env = require('dotenv').config();
const dbConfig = JSON.parse(env.parsed.DB_INFO);


// Create a connection to the database
const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database
});

// open the MySQL connection [version mysql1]
// connection.connect(error => {
//     if (error) throw error;
//     console.log("Successfully connected to the database.");
// });

// const promisePool = pool.promise();
module.exports = pool;