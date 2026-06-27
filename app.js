const express = require("express");
const { client, dbName } = require("./db/connection");

const app = express();

let db;
let customersCollection;

app.use(express.json());

const customerRoutes = require("./routes/customerRoutes");

app.use("/customers", customerRoutes);

// DB CONNECT
client.connect()
.then(() => {

    console.log("✅ Connected to MongoDB");

    db = client.db(dbName);

    customersCollection = db.collection("customers")

    console.log(db.databaseName);

    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });

})
.catch((err) => {
    console.log(err);
});
