const path = require("path");
const express = require("express");

const router = express();

router.get("/notes", (_req, res) => {
    res.sendFile(path.join(__dirname, "./assets/public/notes.html"));

})

router.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "./assets/public/index.html"));

})

router.get("/api/notes", (_req, res) => {
    return res.sendFile(path.json(__dirname, "../assets/db/db.json"));
})

module.exports = router;
