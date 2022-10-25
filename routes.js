const express = require('express');
const userRepository = require('./repository/user-repository');
const historyRepository = require('./repository/history-repository')
const clientRepository = require('./repository/client-repository');
var router = express.Router();

router.get("/", function (req, res) {
    res.render("pages/index");
})

router.get("/clients", function (req, res) {
    clientRepository.findAllClients().then(result => {
        res.render("pages/clients", {
            clients: result[0]
        });
    });
})

router.get("/history", function (req, res) {
    var id = req.query.client;
    if (!id) {
        historyRepository.findAllHistory().then(result => {
            res.render("pages/history", {
                items: result[0],
                shouldReturnToUsers: false
            });
        });
        return;
    }
    clientRepository.findClientById(id).then((clientobj) =>
        historyRepository.findAllHistoryById(id).then(result => {
            res.render("pages/history", {
                items: result[0],
                cliente: clientobj[0][0],
                shouldReturnToUsers: true
            });
        }));
})

router.get("/products", function (req, res) {
    res.render("pages/products");
})

router.get("/users", async function (req, res) {
    userRepository.findAllUsers().then(result => {
        res.render("pages/users", {
            users: result[0]
        });
    });
})

router.post("/edit/user", async function (req, res) {
    userRepository.alterUser(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/users`);
    });
})

router.post("/edit/client", async function (req, res) {
    clientRepository.alterClient(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/clients`);
    });
})

router.post("/add/user", async function (req, res) {
    userRepository.addUser(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/users`);
    });
})

router.post("/add/client", async function (req, res) {
    clientRepository.addClient(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/clients`);
    });
})

router.get("/remove/user", async function (req, res) {
    var id = req.query.id;
    userRepository.deleteUser(id).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/users`);
    });
})

router.get("/remove/client", async function (req, res) {
    var id = req.query.id;
    clientRepository.deleteClient(id).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/clients`);
    });
})

module.exports = router;