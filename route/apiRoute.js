const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

router.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const parseNote = JSON.parse(data);
            res.send(parseNote);
        }
    })
});

router.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
        const parseNote = JSON.parse(data);
        const mergeNote = [...parseNote, newNote];
        const userNote = JSON.stringify(mergeNote);  
        fs.writeFile(path.join(__dirname, "../db/db.json"), userNote, (error, response) => {
            if (error) throw error;
            res.json({ ok: true });
        })
    })
})

router.delete("/api/notes/:id", (req,res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        let userNote = [];
        data = JSON.parse(data);
        for(i=0; i<data.length; i++){
            if (data[i].id !== req.params.id) {
                userNote.push(data[i]);
            }
        }
        userNote = JSON.stringify(userNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), userNote, (err, response) => {
            if (err) throw err;
            res.json({ ok: true });
        })
    })
})

module.exports = router;