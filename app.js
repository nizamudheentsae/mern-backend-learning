const express = require("express");
const { client, dbName } = require("./db/connection");

const app = express();

app.use(express.json());

const customerRoutes = require("./routes/customerRoutes");

app.use("/customers", customerRoutes);

// DB CONNECT
client.connect()
.then(() => {

    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);

    console.log(db.databaseName);

    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });

})
.catch((err) => {
    console.log(err);
});
