const express = require("express");
const fs = require("fs");

const router = express();
let notesData = [];

router
    // .route("/api/notes")
    .get("/api/notes", function(err, res) {
        notesData = fs.readFileSync("./db/db.json", "utf8");
        notesData = JSON.parse(notesData);

        res.json(notesData);
    });
router
    .post("/api/notes", (req, res) => {
        notesData = fs.readFileSync("./db/db.json", "utf8");
        console.log(notesData);

        notesData = JSON.parse(notesData);

        req.body.id = notesData.length;

        notesData.push(req.body);

        notesData = JSON.stringify(notesData);

        fs.writeFile("./db/db.json", "utf8");

        res.json(JSON.parse(notesData));
    });
router
    .delete("/api/notes", (req, res) => {
        notesData = fs.readFileSync("./db/db.json", "utf8");

        notesData = JSON.parse(notesData);

        notesData = notesData.filter(function(note) {
            return note.id != req.params.id;
        })

        notesData = JSON.stringify(notesData);

        fs.writeFile("./db/db.json", "utf8");

        res.send(JSON.parse(notesData));

    });

module.exports = router;
