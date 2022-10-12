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
        res.render("users", {
            users: result[0]
        });
    });
})

router.get("/edit/user", async function (req, res) {
    var id = req.query.id;
    if (id) {
        repository.findUser(id).then(result => {
            res.render("edit_user", {
                user: result[0]
            });
        });
    } else {
        repository.findAllUsers().then(result => {
            res.render("users", {
                users: result[0]
            });
        });
    }
})

router.post("/edit/user", async function (req, res) {
    repository.alterUser(req.body).then(result => {
        repository.findAllUsers().then(result => {
            res.render("users", {
                users: result[0]
            });
        });
    });
})

router.get("/remove/user", async function (req, res) {
    var id = req.query.id;
    repository.findUser(id).then(result => {
        console.log(result);
        res.render("remove_user", {
            user: result[0]
        });
    });
})



module.exports = router;