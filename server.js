const express = require("express");
const fs = require("fs");
const router = require("express").Router();
const htmlRoutes = require("./routes/htmlRoutes");
const path = require("path");
const readAsync = require("util").promisify(fs.readFile);




const app = express();
let notesData = [];

// Server routes/middleware
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));



router
    .get("/notes", (_req, res) => {
        readAsync("./db/db.json", "utf8")
        .then(notes => {
            // notesData = notesData.concat(JSON.parse(notes))
            notesData = JSON.parse(notes);
        })
        

        res.json(notesData);
       
    });
router
    .post("/notes", (req, res) => {
        readAsync("./db/db.json", "utf8")
        // notesData = fs.readFileSync("./db/db.json", "utf8")
        // console.log(notesData)
        .then(notesData => {
            notesData = JSON.parse(notesData);

            req.body.id = notesData.length;

            notesData.push(req.body);

            notesData = JSON.stringify(notesData);

            fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
                if (err) throw err;
            });

            res.json(notesData);
        })
    });
router
    .delete("/notes/:id", (req, res) => {
        readAsync("./db/db.json", "utf8")

        .then(notesData => {

        notesData = JSON.parse(notesData);

        notesData = notesData.filter(function(note) {
            return note.id != req.params.id;
        })

        notesData = JSON.stringify(notesData);

        fs.writeFile("./db/db.json", notesData, "utf8", function(err){
            if (err) throw err;
        });

        res.send(JSON.parse(notesData));

        })

    });

app.use("/api", router);

app.use("/", htmlRoutes );

app.listen(process.env.PORT || 8080, () => {
    console.log("app listening on PORT" + PORT);
})
