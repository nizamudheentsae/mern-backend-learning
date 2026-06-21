
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

router.post("/", (req, res) => {
    const newCustomer = {
        id: customers.length + 1,
        name: req.body.name,
        city: req.body.city
    }
    customers.push(newCustomer);

    res.json(newCustomer)
})


router.put("/:id", (req, res) => {
    const customer = customers.find(
        (c) => c.id === parseInt(req.params.id)
    )

    if(!customer) {
        return res.status (404).json ({
            message: "Customer not Found"
        })
    }
    customer.name = req.body.name;
    customer.city = req.body.city;

    res.json(customer)
})

module.exports = router