
const express = require("express");

const router = express.Router();

const customers = [
  { id: 1, name: "Nizam", city: "Dubai" },
  { id: 2, name: "Ali", city: "Abu Dhabi" },
  { id: 3, name: "Hassan", city: "Sharjah" }
];


router.get("/", (req, res) => {
    res.json(customers);
});

router.get("/:id", (req, res) => {
  const customer = customers.find(
    (c) => c.id === parseInt(req.params.id)
  );

  res.json(customer);
});

module.exports = router