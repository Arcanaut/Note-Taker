const mysql = require('mysql2');

//Connects to database
const db = mysql.createConnection({
    host: 'localhost',
    //MySQL username
    user: 'root',
    //mySQL password
    password: 'Hostage343518!',
    database: 'election'
},
console.log('Connected to the election database.')
);

module.exports = db;