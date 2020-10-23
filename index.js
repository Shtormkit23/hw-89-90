const express = require("express");
const categories = require("./app/category");
const places = require("./app/places");
const items = require("./app/items");
const cors = require("cors");
const db = require("./mysql");
const mysql = require("mysql");
const config = require("./config");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

console.log(config.db)

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
    if(err) {
        console.log(err);
        throw err;
    }
    app.use("/categories", categories(db(connection)));
    app.use("/places", places);
    app.use("/items", items);
    console.log("Connected to mysql");
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
});
