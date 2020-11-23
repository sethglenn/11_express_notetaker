const router = require("express").Router();
const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db.json", "utf8"));

router
    .route("/api/notes")
    .get((_req, res) => {
        res.json(data);
    })

    .post("/api/notes", (req, res) => {
        let uniqueId = (data.length).toString();
        let newNote = req.body;
        console.log(uniqueId);
        data.push(newNote);

        fs.writeFileSync("/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err)
        });

        res.json(data);

    })

    .delete("/api/notes", (req, res) => {
        let noteId = req.params.id;
        let newId = 0;
        console.log(`Note ${noteId} has been deleted.`);
        data = data.filter(currentNote => {
            return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("/db.json", JSON.stringify(data));
        res.json(data);

    });

module.exports = router;
