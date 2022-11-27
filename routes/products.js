const express = require('express');
var router = express.Router();
const Login = require('../login')

const productRepository = require('../repository/product-repository');
const clientRepository = require('../repository/client-repository');

router.get("/", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }

    let fresh = false;
    if (req.query.fresh) fresh = true;

    productRepository.findAllProducts().then(result => {
        res.render("pages/products", {
            products: result[0],
            settings: settings[0],
            fresh: fresh
        });
    });
})

router.post("/edit", async function (req, res) {
    productRepository.alterProduct(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products`);
    });
})

router.post("/add", async function (req, res) {
    productRepository.addProduct(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products`);
    });
})

router.get("/remove", async function (req, res) {
    var id = req.query.id;
    productRepository.deleteProduct(id).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products`);
    });
})

router.post("/search", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }

    let setor = req.body.setor;
    let prateleira = req.body.prateleira;
    if (setor || prateleira) {
        productRepository.findProductsByLocalization(setor, prateleira).then(result => {
            res.render("pages/products", {
                products: result[0],
                settings: settings[0]
            });
        });
        return;
    }

    let descricao = req.body.descricao;
    if (descricao) {
        productRepository.findProductsByDescription(descricao).then(result => {
            res.render("pages/products", {
                products: result,
                settings: settings[0]
            });
        });
        return;
    }

    res.status(404).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products`);
})

var lastNewQuery = null;

router.get("/new", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }

    let selectedProducts = req.query.selectedProducts;
    await updateSelectedProductsInDatabase(selectedProducts);

    if (!req.query.cpfCliente) {
        if (!selectedProducts) {
            res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products`);
            return;
        }

        res.render("pages/venda", {
            products: JSON.parse(selectedProducts),
            settings: settings[0]
        });
        return;
    }

    let client = await clientRepository.findClientByCpf(req.query.cpfCliente);
    if (client[0][0]) {
        await productRepository.newSale(settings[0][0].id, client[0][0].id, JSON.parse(selectedProducts));
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products?fresh=true`);
        return;
    }

    lastNewQuery = req.query;
    res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products/newclient`);
})

async function updateSelectedProductsInDatabase (selectedProducts) {
    for (let product of selectedProducts) {
        await productRepository.alterProduct(product);
    }
}

router.get("/newclient", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }

    console.log(lastNewQuery);
    res.render("pages/newclient", {
        cpf: lastNewQuery.cpfCliente,
        settings: settings[0]
    });
})

router.post("/newclient", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }

    await clientRepository.addClient(req.body); 
    let cliente = await clientRepository.findClientByCpf(req.body.cpf); 
    await productRepository.newSale(settings[0][0].id, cliente[0][0].id, JSON.parse(lastNewQuery.selectedProducts))
    res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products?fresh=true`);
})

module.exports = router;