const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.use('/styles', express.static('public/styles'));
app.use('/images', express.static('public/img'));
app.use('/fonts', express.static('public/fonts'));

app.use(require("./routes"));

var server = app.listen(6900, function() {
    var host = server.address().address
    var port = server.address().port
  
    console.log(`Servidor de pé! Rodando em ${host}:${port}`)
});