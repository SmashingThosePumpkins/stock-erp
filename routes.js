const express = require('express');
const repository = require('./repository');
var router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
})

router.get("/clients", function (req, res) {
    res.render("clients");
})

router.get("/history", function (req, res) {
    res.render("history");
})

router.get("/products", function (req, res) {
    res.render("products");
})

router.get("/users", async function (req, res) {
    repository.findAllUsers().then(result => {
        console.log(result[0]);
        res.render("users", result[0]);
    });
})































module.exports = router;