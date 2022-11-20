const Fuse = require('fuse.js')
const pool = require("./dbconfig.js").pool;

module.exports = {
    findAllClients: async function () {
        return pool.query(
            "SELECT * FROM perfil_cliente ORDER BY perfil_cliente.nome"
        );
    },
    findClientById: async function (id) {
        return pool.query(
            "SELECT * FROM perfil_cliente WHERE perfil_cliente.id = ?", id
        );
    },
    findClientByCpf: async function (cpf) {
            let result = await pool.query(
                "SELECT * FROM perfil_cliente WHERE perfil_cliente.cpf = ?", cpf
            );
            return result;
    },
    findClientsByName: async function (nome) {
        var clients = await pool.query(
            "SELECT * FROM perfil_cliente;"
        );

        var options = {
            includeScore: true,
            keys: ['nome']
        }

        var fuse = new Fuse(clients[0], options)
        let result = fuse.search(nome);

        let clientList = Array();
        result.forEach(result => clientList.push(result.item));
        console.log(clientList);
        return clientList;
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