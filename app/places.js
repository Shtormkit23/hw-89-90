const express = require("express");
const router = express.Router();
const db = require("../mysql");

const resource = 'places';

const createRouter = (db) => {
    router.get("/", async (req, res) => {
        try{
            const places = await db.getItems(resource);
            res.send(places);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    router.get("/:id", async (req, res) => {
        const id = req.params.id;
        const result = await db.getItem(resource, id);

        if(!result.length) {
            res.send('Row with id - ['+id+'] not found');
        }

        res.send(result[0]);
    });

    router.post("/", async (req, res) => {
        const data = req.body;
        const qb = await db.createItem(resource, data);
        const result = await db.getItem(resource, qb.insertId)
        res.send(result[0]);
    });

    router.put("/:id", async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const result = await db.updateItem(resource, data, id);

        if(result.affectedRows === 0) {
            res.send('Row with id ['+id+'] not found');
        }
        const place = await db.getItem(resource, id)
        res.send(place[0]);
    });

    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        db.deleteItem(resource, id)
        res.send("Row with id - ["+ id + "] removed");
    });

    return router;
}

module.exports = createRouter;
