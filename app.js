const express = require("express");

const app = express();

app.use(express.json());

const customerRoutes = require("./routes/customerRoutes");

app.use("/customers", customerRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});