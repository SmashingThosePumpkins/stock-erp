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

    let clear = false;
    if (req.query.clear) clear = true;

    productRepository.findAllProducts().then(result => {
        res.render("pages/products", {
            products: result[0],
            settings: settings[0],
            clear: clear
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

    if (!req.query.cpfCliente) {
        let selectedProducts = req.query.selectedProducts;

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

    console.log("a")
    let client = await clientRepository.findClientByCpf(req.query.cpfCliente);
    console.log("b")
    if (client[0][0]) {
        productRepository.newSale(settings[0][0].id, req.query.cpfCliente, JSON.parse(req.query.selectedProducts), 0.0);
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products`);
        return;
    }

    lastNewQuery = req.query;
    res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products/newclient`);
})

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

    clientRepository.addClient(req.body).then(a => {
            productRepository.newSale(settings[0][0].id, lastNewQuery.cpfCliente, JSON.parse(lastNewQuery.selectedProducts), 0.0)
            res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products?fresh=true`);
        }
    );
})

module.exports = router;