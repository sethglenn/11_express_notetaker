const express = require("express");
const fs = require("fs");
const router = require("express").Router();
const htmlRoutes = require("./htmlRoutes");
// const db = require("../assets/db/db.json");


const app = express();
let notesData = [];
// notesData = db;

// Server routes/middleware
const routes = require("./htmlRoutes");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("./assets/public"));

app.use("/", htmlRoutes );

router
    .get("/api/notes", (err, res) => {
        notesData = fs.readFileSync("../assets/db/db.json", "utf8");
        notesData = JSON.parse(notesData);

        res.json(notesData);
       
    });
router
    .post("/api/notes", (req, res) => {
        notesData = fs.readFileSync("../assets/db/db.json", "utf8");
        console.log(notesData);

        notesData = JSON.parse(notesData);

        req.body.id = notesData.length;

        notesData.push(req.body);

        notesData = JSON.stringify(notesData);

        fs.writeFile("../assets/db/db.json", "utf8");

        res.json(JSON.parse(notesData));
    });
router
    .delete("/api/notes", (req, res) => {
        notesData = fs.readFileSync("../assets/db/db.json", "utf8");

        notesData = JSON.parse(notesData);

        notesData = notesData.filter(function(note) {
            return note.id != req.params.id;
        })

        notesData = JSON.stringify(notesData);

        fs.writeFile("../assets/db/db.json", "utf8");

        res.send(JSON.parse(notesData));

    });    
app.use("/", router);

app.listen(PORT, () => {
    console.log("app listening on PORT" + PORT);
})
