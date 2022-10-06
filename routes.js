var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
    validateLoginThenRender("index", res);
})

router.get("/clients", function(req, res) {
    validateLoginThenRender("clients", res);
})

router.get("/history", function(req, res) {
    validateLoginThenRender("history", res);
})

router.get("/products", function(req, res) {
    validateLoginThenRender("products", res);
})

router.get("/users", function(req, res) {
    validateLoginThenRender("users", res);
})

function validateLoginThenRender(page, res) {
    res.render(page);
}

module.exports = router;