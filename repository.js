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
    findAllUsers: async function () {
        return pool.query(
            "SELECT * FROM usuario"
        );
    },
    findUser: async function (id) {
        return pool.query(
            "SELECT * FROM usuario WHERE usuario.id = ?", id
        );
    },
    alterUser: async function (user) {
        let id = user.id;
        if (!id) return 400;

        let username = "";
        if (user.nome) username = `nome = "${user.nome}", `;

        let password = "";
        if (user.senha) password = `senha = "${user.senha}", `;

        let admin = "";
        if (user.administrador) admin = `administrador = 1 `;
        else admin = `administrador = 0 `;

        let query = "UPDATE usuario SET ".concat(username, password, admin, `WHERE usuario.id = ${id};`);
        console.log(`query -> ${query}`)
        await pool.query(query);
        return 100;
    },
    deleteUser: async function (id) {
        if (!id) return 400;
        await pool.query("DELETE FROM usuario WHERE usuario.id = ?;", id);
        return 100;
    }
};