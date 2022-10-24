const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    timezone: 'Z'
}).promise();

module.exports = {
    findAllHistory: async function () {
        return pool.query(
            "SELECT * FROM movimento_peca ORDER BY horario DESC"
        );
    },
    findAllHistoryById: async function (clientid) {
        return pool.query(
            "SELECT * FROM movimento_peca WHERE movimento_peca.id_cliente = ? ORDER BY horario DESC", clientid
        );
    }
}