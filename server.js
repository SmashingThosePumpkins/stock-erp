const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.use('/styles', express.static('public/styles'));
app.use('/images', express.static('public/img'));
app.use('/fonts', express.static('public/fonts'));
app.use('/scripts', express.static('public/scripts'));

var server = app.listen(6900, function () {
  var host = server.address().address
  var port = server.address().port

  console.log(`Servidor de pé! Rodando em ${host}:${port}`)
});

app.use(require("./routes"));