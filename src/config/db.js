const mysql = require('mysql2');
require ('dotenv').config();

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
/**
 *tells Node.js try to connect to Mysql database 
 * 
 */
connection.connect((err) => {
  if (err) {
    console.log('Database Connection Failed:', err);
  } else {
    console.log('MySQL Connected');
  }
});

module.exports = connection;