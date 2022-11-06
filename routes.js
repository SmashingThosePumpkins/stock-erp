const express = require('express');
var router = express.Router();
const Login = require('./login')

router.get("/", async function (req, res) {
    let settings = await Login.check();
    if (!settings) {
        res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/login`);
        return;
    }
    res.render("pages/index", {
        settings: settings[0]
    });
})

router.get("/login", function (req, res) {
    res.render("pages/login");
})

router.post("/login", async function (req, res) {
    await Login.logIn(req.body.user, req.body.pass);
    res.redirect(`http://${req.hostname}:${process.env.SERVER_PORT}/`)
})

router.get("/signin", function (req, res) {
    res.render("pages/signin");
})

module.exports = router;