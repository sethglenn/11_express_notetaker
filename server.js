const express = require("express");
const fs = require("fs");
const router = require("express").Router();
const htmlRoutes = require("./routes/htmlRoutes");
const path = require("path");
// const db = require("./db/db.json");
const readAsync = require("util").promisify(fs.readFile);




const app = express();
let notesData = [];
// notesData = db;

// Server routes/middleware
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));



router
    .get("/notes", (req, res) => {
        readAsync("./db/db.json", "utf8")
        .then(notes => {
            notesData = notesData.concat(JSON.parse(notes))
        })
        

        res.json(notesData);
       
    });
router
    .post("/notes", (req, res) => {
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
    .delete("/notes", (req, res) => {
        notesData = fs.readFileSync("./db/db.json", "utf8");

        notesData = JSON.parse(notesData);

        notesData = notesData.filter(function(note) {
            return note.id != req.params.id;
        })

        notesData = JSON.stringify(notesData);

        fs.writeFile("./db/db.json", "utf8");

        res.send(JSON.parse(notesData));

    });    
app.use("/api", router);

app.use("/", htmlRoutes );

app.listen(PORT, () => {
    console.log("app listening on PORT" + PORT);
})
