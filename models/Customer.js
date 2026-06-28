const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },

  city: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    min: 1,
    max: 120
  },

  job: {
    type: String,
    default: "Not Assigned"
  }
});

module.exports = mongoose.model("Customer", customerSchema);