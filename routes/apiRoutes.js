const router = require("express").Router();
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./assets/db/db.json", "utf8"));

router
    .route("/api/notes")
    .get((_req, res) => {
        res.json(data);
    })
router
    .post("/api/notes", (req, res) => {
        let uniqueId = (data.length).toString();
        let newNote = req.body;
        console.log(uniqueId);
        data.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err)
        });

        res.json(data);

    })
router
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
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);

    });

module.exports = router;
