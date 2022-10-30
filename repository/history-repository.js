const pool = require("./dbconfig.js").pool;

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