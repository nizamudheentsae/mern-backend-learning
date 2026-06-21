
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("All Customers");
});

router.get("/:id", (req, res) => {
    res.send(`Customer ID: ${req.params.id}`);
});

module.exports = router