const { ObjectId } = require("mongodb");
const express = require("express");

const Customer = require("../models/Customer");

const router = express.Router();

const customers = [
  { id: 1, name: "Nizam", city: "Dubai" },
  { id: 2, name: "Ali", city: "Abu Dhabi" },
  { id: 3, name: "Hassan", city: "Sharjah" },
];

router.get("/", async (req, res) => {
  const customers = await Customer.find();

  res.json(customers);
});

router.get("/search", (req, res) => {
  const city = req.query.city;

  const result = customers.filter(
    (c) => c.city.toLowerCase() === city.toLowerCase(),
  );
  res.json(result);
});

router.get("/search-name", (req, res) => {
  const name = req.query.name;

  const nameResult = customers.filter(
    (c) => c.name.toLowerCase() === name.toLowerCase(),
  );

  res.json(nameResult);
});
router.get("/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  res.sendStatus(200).json(customer);
});

// AD NEW DATA OR CUSTOMER

router.post("/", async (req, res) => {
  const { name, city } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  if (!city) {
    return res.status(400).json({
      message: "City is required",
    });
  }

  const customer = {
    name,
    city,
  };

  const newCustomer = await Customer.create(customer);

  res.status(201).json({
    message: "Customer created successfully",
    customer: newCustomer,
  });
});

// EDIT OR UPDATE DATA

router.put("/:id", async (req, res) => {
  const { name, city, age, job } = req.body;

  const updateData = {};

  if (name) updateData.name = name;
  if (city) updateData.city = city;
  if (age) updateData.age = age;
  if (job) updateData.job = job;

  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true },
  );

  if (!updatedCustomer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  res.json({
    message: "Customer updated successfully",
    customer: updatedCustomer,
  });
});

// DELETE OR REMOVE DAT / CUSTOMER

router.delete("/:id", async (req, res) => {

    const deletedCustomer =
        await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
        return res.status(404).json({
            message: "Customer not found"
        });
    }

    res.json({
        message: "Customer deleted successfully",
        customer: deletedCustomer
    });

});



module.exports = router;
