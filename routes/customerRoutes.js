const {ObjectId} =require("mongodb");
const express = require("express");

const router = express.Router();

const customers = [
  { id: 1, name: "Nizam", city: "Dubai" },
  { id: 2, name: "Ali", city: "Abu Dhabi" },
  { id: 3, name: "Hassan", city: "Sharjah" }
];


router.get("/", async (req, res) => {

    const customers = await req.customersCollection.find().toArray();

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


// AD NEW DATA OR CUSTOMER

router.post("/", async (req, res) => {

    const {name, city} = req.body;

    if (!name) {
      return res.status(400).json ({
        message: "Name is required"
      })
    }

    if (!city) {
      return res.status(400).json({
        message: "City is required"
      })
    }
    
    // if (!req.body.name || !req.body.city) {
    //   return res.status(400).json({
    //     message: "Name and city are required"
    //   });
    // }
  
  // const newCustomer = {
  //       id: customers.length + 1,
  //       name: req.body.name,
  //       city: req.body.city
  //   }
  //   customers.push(newCustomer);


    const customer = {
          name, city
    };

     const result = await req.customersCollection.insertOne(customer);

    res.status(201).json({
        message: "Customer created successfully",
        insertedId: result.insertedId
    });

});


// EDIT OR UPDATE DATA

router.put("/:id", async (req, res) => {

    const id = new ObjectId (req.params.id)
    const customer = await req.customersCollection.findOne({
          _id: id
    });

    if(!customer) {
        return res.status (404).json ({
            message: "Customer not Found"
        })
    }

    await req.customersCollection.updateOne(
      {
          _id: id
      },
      {
        $set: {
          name: req.body.name,
          city: req.body.city
        }
      }
    )

    // if (!name) {
    //   return res.status(400).json ({
    //     message: "Name is required"
    //   })
    // }
    
    // if (!city) {
    //   return res.status(400).json ({
    //     message: "City is required"
    //   })
    // }

    // customer.name = req.body.name;
    // customer.city = req.body.city;

   res.json({
    message: "Customer Updated Successfully"
   })
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