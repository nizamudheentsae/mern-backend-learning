
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

router.get("/search", (req, res) => {
    const city = req.query.city;

    const result = customers.filter(
        (c) => c.city.toLowerCase() === city.toLowerCase()

    )
    res.json(result);
})

router.get("/search-name", (req, res) => {
    const name = req.query.name;

    const nameResult = customers.filter(
        (c) => c.name.toLowerCase() === name.toLowerCase()


    )

    res.json(nameResult);

})
router.get("/:id", (req, res) => {
  const customer = customers.find(
    (c) => c.id === parseInt(req.params.id)
  );

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found"
    })
  }

  res.sendStatus(200).json(customer);
});

router.post("/", (req, res) => {
    
    if (!req.body.name || !req.body.city) {
      return res.status(400).json({
        message: "Name and city are required"
      });
    }
  
  const newCustomer = {
        id: customers.length + 1,
        name: req.body.name,
        city: req.body.city
    }
    customers.push(newCustomer);

    res.sendStatus(201).json({
      message: "Customer created successfully",
      customer: newCustomer
    })
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

router.delete("/:id", (req, res) => {

  const customerIndex = customers.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );

  if (customerIndex === -1) {
    return res.status(404).json({
      message: "Customer not found"
    });
  }

  const deletedCustomer = customers[customerIndex];

  customers.splice(customerIndex, 1);

  res.json({
    message: "Customer deleted successfully",
    customer: deletedCustomer
  });

});


module.exports = router;