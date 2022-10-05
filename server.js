const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.use('/styles', express.static('public/styles'));
app.use('/images', express.static('public/img'));
app.use('/fonts', express.static('public/fonts'));

app.get("/", function(req, res) {
    console.log("Renderizando INDEX!")
    res.render("index");
})

app.get("/pag1", function(req, res) {
    console.log("Renderizando PAGINA 1!")
    res.render("pag1");
})

app.get("/pag2", function(req, res) {
    console.log("Renderizando PAGINA 2!")
    res.render("pag2");
})

app.get("/pag3", function(req, res) {
    console.log("Renderizando PAGINA 3!")
    res.render("pag3");
})

app.listen(6900);
console.log("Servidor de pé!")