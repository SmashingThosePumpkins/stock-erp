const express = require('express');
var router = express.Router();
const Login = require('../login')

const userRepository = require('../repository/user-repository');

router.get("/", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }
    userRepository.findAllUsers().then(result => {
        res.render("pages/users", {
            users: result[0],
            settings: settings[0]
        });
    });
})

router.post("/edit", async function (req, res) {
    userRepository.alterUser(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/users`);
    });
})

router.post("/add", async function (req, res) {
    userRepository.addUser(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/users`);
    });
})

router.get("/remove", async function (req, res) {
    var id = req.query.id;
    userRepository.deleteUser(id).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/users`);
    });
})

module.exports = router;