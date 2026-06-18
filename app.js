const express = require("express");

const app = express();


app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});


app.get("/customers", (req, res) => {
    res.send("Customers Page");
});

app.get("/customers/:id", (req, res) => {
    res.send(`Customer ID: ${req.params.id}` )
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
});


