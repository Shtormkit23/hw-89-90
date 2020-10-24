const express = require("express");
const categories = require("./app/category");
const places = require("./app/places");
const items = require("./app/items");
const cors = require("cors");
const mysql = require("mysql");
const config = require("./config");
const db = require("./mysql");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
    if(err) {
        console.log(err);
        throw err;
    }
    app.use("/categories", categories(db(connection)));
    app.use("/places", places(db(connection)));
    app.use("/items", items(db(connection)));
    console.log("Connected to mysql");
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
});
