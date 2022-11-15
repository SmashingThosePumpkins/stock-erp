const express = require('express');
var router = express.Router();
const Login = require('../login')

const productRepository = require('../repository/product-repository');

router.get("/", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }
    productRepository.findAllProducts().then(result => {
        res.render("pages/products", {
            products: result[0],
            settings: settings[0]
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

router.get("/new", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }

    let selectedProducts = req.query.selectedProducts;
    console.log(JSON.parse(selectedProducts));
    if (!selectedProducts) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products`);
        return;
    }

    res.render("pages/venda", {
        products: result[0],
        settings: JSON.parse(selectedProducts)
    });
})

module.exports = router;