const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const db = require("../mysql");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});


const createRouter = (db) => {
    router.get("/", async (req, res) => {
        try{
            const items = await db.getItems("items");
            res.send(items);
        } catch (e) {
            res.status(500).send(e);
        }

    });

    router.get("/:id", async (req, res) => {
        const response = db.getItem("items", req.params.id);
        res.send(response[0]);
    });

    router.post("/", upload.single("image"), async (req, res) => {
        const item = req.body;
        if (req.file) {
            item.image = req.file.filename;
        }
        const newItem = await db.createItem("items", item);
        res.send(newItem);
    });

    return router;
}

module.exports = createRouter;