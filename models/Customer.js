
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: String,
    city: String,
    age: Number,
    job: String
});

module.exports = customerSchema;