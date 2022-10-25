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
    findAllClients: async function () {
        return pool.query(
            "SELECT * FROM perfil_cliente"
        );
    },
    findClientById: async function (id) {
        return pool.query(
            "SELECT * FROM perfil_cliente WHERE perfil_cliente.id = ?", id
        );
    },
    addClient: async function (client) {
        if (!client.nome || !client.cpf || !client.telefone) return 400;

        let query = `INSERT INTO perfil_cliente VALUES (null, "${client.cpf}", "${client.nome}", "${client.telefone}");`;
        console.log(query);
        await pool.query(query);
        return 100;
    },
    alterClient: async function (client) {
        let id = client.id;
        if (!id) return 400;

        let params = Array(3);

        if (client.nome) params.push(`nome = "${client.nome}"`);
        if (client.cpf) params.push(`cpf = "${client.cpf}"`);
        if (client.telefone) params.push(`telefone = "${client.telefone}"`);

        if (params.every((p) => !p)) return 100;

        let query = `UPDATE perfil_cliente SET ${params.filter(Boolean).join(", ")} WHERE perfil_cliente.id = ${id};`;
        await pool.query(query);
        return 100;
    },
    deleteClient: async function (id) {
        if (!id) return 400;
        await pool.query("DELETE FROM perfil_cliente WHERE perfil_cliente.id = ?;", id);
        return 100;
    }
}