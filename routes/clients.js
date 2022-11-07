const express = require('express');
var router = express.Router();
const Login = require('../login')

const clientRepository = require('../repository/client-repository');

router.get("/", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }
    clientRepository.findAllClients().then(result => {
        res.render("pages/clients", {
            clients: result[0],
            settings: settings[0]
        });
    });
})

router.post("/edit", async function (req, res) {
    clientRepository.alterClient(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/clients`);
    });
})



router.post("/add", async function (req, res) {
    clientRepository.addClient(req.body).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/clients`);
    });
})

router.get("/remove", async function (req, res) {
    var id = req.query.id;
    clientRepository.deleteClient(id).then(result => {
        res.status(result).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/clients`);
    });
})


router.post("/search", async function (req, res) {
    let cpf = req.body.cpf;
    if (cpf && cpf.length == 11) {
        clientRepository.findClientByCpf(cpf).then(result => {
            res.render("pages/clients", {
                clients: result[0]
            });
        });
        return;
    }

    let nome = req.body.nome;
    if (nome) {
        clientRepository.findClientsByName(nome).then(result => {
            res.render("pages/clients", {
                clients: result
            });
        });
        return;
    }

    res.status(404).redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/clients`);
})

module.exports = router;