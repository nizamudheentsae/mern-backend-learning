const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log("Middleware Running");
    next();
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/customers", (req, res) => {
  res.send("Customers Page");
});

app.get("/customers/:id/orders/:orderId", (req, res) => {
  res.send(`Customer ID: ${req.params.id}, Order ID: ${req.params.orderId}`);
});

app.get("/search", (req, res) => {
  res.send(`Search: ${req.query.name}`)
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
