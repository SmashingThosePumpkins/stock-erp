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
    findAllUsers: async function() {
        return pool.query(
            "SELECT * FROM usuario"
        );
    },
    findUser: async function(id) {
        return pool.query(
            "SELECT * FROM usuario WHERE usuario.id = ?", id
        );
    },
    alterUser: async function(user) {
        console.log(user)
        var username = user.nome;
        var password = user.senha;
        var admin = user.administrador;
        var id = user.id;
        var result = pool.query(
            "UPDATE usuario SET nome = ?, senha = ?, administrador = ? WHERE usuario.id = ?", username, password, admin, id
        );
        console.log(result);
        return 0;
    }
};