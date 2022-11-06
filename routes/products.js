const express = require('express');
var router = express.Router();

const productRepository = require('../repository/product-repository');

router.get("/", function (req, res) {
    productRepository.findAllProducts().then(result => {
        res.render("pages/products", {
            products: result[0]
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
    let setor = req.body.setor;
    let prateleira = req.body.prateleira;
    if (setor || prateleira) {
        productRepository.findProductsByLocalization(setor, prateleira).then(result => {
            res.render("pages/products", {
                products: result[0]
            });
        });
        return;
    }

    let descricao = req.body.descricao;
    if (descricao) {
        productRepository.findProductsByDescription(descricao).then(result => {
            res.render("pages/products", {
                products: result
            });
        });
        return;
    }

    res.status(404).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/products`);
})

module.exports = router;