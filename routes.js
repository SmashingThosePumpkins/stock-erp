var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
    console.log("Renderizando INDEX!");
    res.render("index");
})

router.get("/pag1", function(req, res) {
    console.log("Renderizando PAGINA 1!");
    res.render("pag1");
})

router.get("/pag2", function(req, res) {
    console.log("Renderizando PAGINA 2!");
    res.render("pag2");
})

router.get("/pag3", function(req, res) {
    console.log("Renderizando PAGINA 3!");
    res.render("pag3");
})

module.exports = router;