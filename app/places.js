const express = require("express");
const router = express.Router();
const db = require("../mysql");



const createRouter = (db) => {
    router.get("/", async (req, res) => {
        try{
            const places = await db.getItems("places");
            res.send(places);
        } catch (e) {
            res.status(500).send(e);
        }

    });

    router.get("/:id", async (req, res) => {
        const response = db.getItem("places", req.params.id);
        res.send(response[0]);
    });

    router.post("/", async (req, res) => {
        const place = req.body;
        const newPlace = await db.createItem("places", place);
        res.send(newPlace);
    });

    return router;
}

module.exports = createRouter;
