const express = require("express");
const router = express.Router();
const db = require("../mysql");

const createRouter = (db) => {
    router.get("/", async (req, res) => {
        try{
            const categories = await db.getItems("categories");
            res.send(categories);
        } catch (e) {
            res.status(500).send(e);
        }

    });

    router.get("/:id", async (req, res) => {
        const response = db.getItem("categories", req.params.id);
        res.send(response[0]);
    });

    router.post("/", async (req, res) => {
        const category = req.body;
        const newCategory = await db.createItem("categories", category);
        res.send(newCategory);
    });

    router.delete("/:id", (req, res) => {
        const category = db.deleteItem(req.params.id);
        if (!category) return res.sendStatus(404);
        res.send(category);
    });
    return router;
}

module.exports = createRouter;