const express = require("express");
const router = express.Router();

const resource = 'items';

const createRouter = (db) => {
    router.get("/", async (req, res) => {
        try{
            const items = await db.getItems(resource);
            res.send(items);
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
        const category = await db.getItem('categories', data.categories_id)
        const place = await db.getItem('places', data.places_id)

        if(category.length === 0) {
            res.send('Category with id ['+data.categories_id+ '] not found');
        }

        if(place.length === 0) {
            res.send('Place with id ['+data.places_id+ '] not found');
        }

        const qb = await db.createItem(resource, data);
        const result = await db.getItem(resource, qb.insertId)
        res.send(result[0]);
    });

    router.put("/:id", async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const item = await db.getItem(resource, id)
        const category = await db.getItem('categories', data.categories_id)
        const place = await db.getItem('places', data.places_id)

        if(item.length === 0) {
            res.send('Row with id ['+id+'] not found');
        }

        if(category.length === 0) {
            res.send('Category with id ['+data.categories_id+ '] not found');
        }

        if(place.length === 0) {
            res.send('Place with id ['+data.places_id+ '] not found');
        }

        await db.updateItem(resource, data, id);

        res.send(item[0]);
    });

    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        db.deleteItem(resource, id)
        res.send("Row with id - ["+ id + "] removed");
    });

    return router;
}

module.exports = createRouter;