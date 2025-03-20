const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
//chamar o db de usuarios
//chamar o midleware

router.get("/login", (req, res) => {
    res.send("Em desenvolvimento");
});

router.get("/user", (req, res) => {

});

router.post("/user", (req, res) => {

});

router.put("/user", (req, res) => {

});

router.delete("/user", (req, res) => {

});

module.exports = router;