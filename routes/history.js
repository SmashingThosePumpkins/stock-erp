const express = require('express');
var router = express.Router();

const historyRepository = require('../repository/history-repository')
const clientRepository = require('../repository/client-repository');

router.get("/", function (req, res) {
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

module.exports = router;