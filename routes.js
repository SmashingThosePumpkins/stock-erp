const express = require('express');
const repository = require('./repository');
var router = express.Router();

router.get("/", function (req, res) {
    res.render("pages/index");
})

router.get("/clients", function (req, res) {
    res.render("pages/clients");
})

router.get("/history", function (req, res) {
    res.render("pages/history");
})

router.get("/products", function (req, res) {
    res.render("pages/products");
})

router.get("/users", async function (req, res) {
    repository.findAllUsers().then(result => {
        res.render("pages/users", {
            users: result[0]
        });
    });
})

router.get("/edit/user", async function (req, res) {
    var id = req.query.id;
    if (id) {
        repository.findUser(id).then(result => {
            res.render("pages/edit_user", {
                user: result[0]
            });
        });
    } else {
        repository.findAllUsers().then(result => {
            res.render("pages/users", {
                users: result[0]
            });
        });
    }
})

router.post("/edit/user", async function (req, res) {
    repository.alterUser(req.body).then(result => {
        repository.findAllUsers().then(result => {
            res.render("pages/users", {
                users: result[0]
            });
        });
    });
})

router.get("/remove/user", async function (req, res) {
    var id = req.query.id;
    repository.deleteUser(id).then(result => {
        console.log(result);
        repository.findAllUsers().then(result => {
            res.render("pages/users", {
                users: result[0]
            });
        });
    });
})



module.exports = router;