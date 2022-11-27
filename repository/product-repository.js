const Fuse = require('fuse.js');
const clientRepository = require('./client-repository.js');
const pool = require("./dbconfig.js").pool;

module.exports = {
    findAllProducts: async function () {
        return pool.query(
            "SELECT * FROM perfil_peca ORDER BY perfil_peca.descricao"
        );
    },
    findProductById: async function (id) {
        return pool.query(
            "SELECT * FROM perfil_peca WHERE perfil_peca.id = ?", id
        );
    },
    findProductsByDescription: async function (descricao) {
        var products = await pool.query(
            "SELECT * FROM perfil_peca;"
        );

        var options = {
            includeScore: true,
            keys: ['descricao']
        }

        var fuse = new Fuse(products[0], options)
        let result = fuse.search(descricao);

        let productList = Array();
        result.forEach(result => productList.push(result.item));
        console.log(productList);
        return productList;
    },
    findProductsByLocalization: async function (setor, prateleira) {
        if (!setor) return;
        if (!prateleira) {
            return pool.query(
                "SELECT * FROM perfil_peca " +
                `WHERE perfil_peca.setor = "${setor.toUpperCase()}" ` +
                "ORDER BY perfil_peca.prateleira"
            );
        }

        return pool.query(
            "SELECT * FROM perfil_peca " +
            `WHERE perfil_peca.setor = "${setor.toUpperCase()}" AND ` +
            `perfil_peca.prateleira = ${prateleira} ` +
            "ORDER BY perfil_peca.prateleira"
        );

    },
    addProduct: async function (product) {
        if (!product.setor || !product.descricao || !product.prateleira || !product.valor) return 400;

        let query = `INSERT INTO perfil_peca VALUES (null, "${product.valor}", "${product.descricao}", "${product.setor.toUpperCase()}", ${product.prateleira}, false);`;
        console.log(query);
        await pool.query(query);
        return 100;
    },
    alterProduct: async function (product) {
        let id = product.id;
        if (!id) return 400;

        let params = Array(4);

        if (product.descricao) params.push(`descricao = "${product.descricao}"`);
        if (product.valor) params.push(`valor = ${product.valor}`);
        if (product.setor) params.push(`setor = "${product.setor.toUpperCase()}"`);
        if (product.prateleira) params.push(`prateleira = "${product.prateleira}"`);

        if (params.every((p) => !p)) return 100;

        let query = `UPDATE perfil_peca SET ${params.filter(Boolean).join(", ")} WHERE perfil_peca.id = ${id};`;
        await pool.query(query);
        return 100;
    },
    deleteProduct: async function (id) {
        if (!id) return 400;
        await pool.query("DELETE FROM perfil_peca WHERE perfil_peca.id = ?;", id);
        return 100;
    },
    newSale: async function (idvendor, idcliente, products) {
        for (let product of products) {
            let query = `INSERT INTO movimento_peca VALUES (null, ${product.id}, ${idcliente}, ${idvendor}, "${new Date().toISOString().slice(0, 19).replace('T', ' ')}");`;
            await pool.query(query);
            let query2 = `UPDATE perfil_peca SET vendida = 1 WHERE perfil_peca.id = ${product.id};`;
            await pool.query(query2);
        }
    }
}