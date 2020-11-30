const router = require("express").Router();
const fs = require("fs");

let notesData = [];

router
    // .route("/api/notes")
    .get("/api/notes", function(err, res) {
        notesData = fs.readFileSync("./assets/db/db.json", "utf8");
        notesData = JSON.parse(notesData);

        res.json(notesData);
    });
router
    .post("/api/notes", (req, res) => {
        notesData = fs.readFileSync("./assets/db/db.json", "utf8");
        console.log(notesData);

        notesData = JSON.parse(notesData);

        

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
        fs.writeFileSync("./assets/db/db.json", JSON.stringify(data));
        res.json(data);

    });

module.exports = router;
