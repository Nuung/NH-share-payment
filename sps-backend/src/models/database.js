'use strict';

const mysql = require("mysql");
const env = require('dotenv').config();
const dbConfig = JSON.parse(env.parsed.DB_INFO);


// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;