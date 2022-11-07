const express = require('express');
var router = express.Router();
const Login = require('../login')

const historyRepository = require('../repository/history-repository')
const clientRepository = require('../repository/client-repository');

router.get("/", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }
    var id = req.query.client;
    if (!id) {
        historyRepository.findAllHistory().then(result => {
            res.render("pages/history", {
                items: result[0],
                shouldReturnToUsers: false,
                settings: settings[0]
            });
        });
        return;
    }
    clientRepository.findClientById(id).then((clientobj) =>
        historyRepository.findAllHistoryById(id).then(result => {
            res.render("pages/history", {
                items: result[0],
                cliente: clientobj[0][0],
                shouldReturnToUsers: true,
                settings: settings[0]
            });
        }));
})

module.exports = router;