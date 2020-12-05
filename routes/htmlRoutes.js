const path = require("path");
const express = require("express");

const router = express();

router.get("/notes", (_req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));

})

router.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));

})

module.exports = router;
