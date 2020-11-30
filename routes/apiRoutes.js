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

        req.body.id = notesData.length;

        notesData.push(req.body);

        notesData = JSON.stringify(notesData);

        fs.writeFile("./assets/db/db.json", "utf8");

        res.json(JSON.parse(notesData));
    });
router
    .delete("/api/notes", (req, res) => {
        notesData = fs.readFileSync("./assets/db/db.json", "utf8");

        notesData = JSON.parse(notesData);

        

    });

module.exports = router;
