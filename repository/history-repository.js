const pool = require("./dbconfig.js").pool;

module.exports = {
    findAllHistory: async function () {
        return pool.query(
           `select 
                movimento_peca.id,
                perfil_peca.descricao as peca,
                perfil_cliente.nome as cliente,
                usuario.nome as vendedor,
                perfil_peca.valor,
                movimento_peca.horario
            from
                movimento_peca,
                perfil_peca,
                perfil_cliente,
                usuario
            where
                movimento_peca.id_peca = perfil_peca.id and
                movimento_peca.id_vendedor = usuario.id and
                movimento_peca.id_cliente = perfil_cliente.id
            order by
                movimento_peca.horario desc;`
        );
    },
    findAllHistoryById: async function (clientid) {
        return pool.query(
            `select 
                movimento_peca.id,
                perfil_peca.descricao as peca,
                perfil_cliente.nome as cliente,
                usuario.nome as vendedor,
                perfil_peca.valor,
                movimento_peca.horario
            from
                movimento_peca,
                perfil_peca,
                perfil_cliente,
                usuario
            where
                movimento_peca.id_peca = perfil_peca.id and
                movimento_peca.id_vendedor = usuario.id and
                movimento_peca.id_cliente = perfil_cliente.id and
                perfil_cliente.id = ?
            order by
                movimento_peca.horario desc;`, clientid
        );
    }
}