// src/config/database.js
const mysql = require('mysql2');
require('dotenv').config();

let connection;

const init = () => {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no banco de dados:', err);
      throw err;
    }
    console.log('Conexão com MySQL bem sucedida!');
  });
};

setTimeout(() => {
  init();
}, 10000);

module.exports = connection;
