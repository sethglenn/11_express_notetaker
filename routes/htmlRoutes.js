const path = require("path");
const router = require("express").Router();

router.get("/notes", (_req, res) => {
    res.sendFile(path.join(__dirname, "assets/public/notes.html"));

})

router.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "assets/public/index.html"));

})

module.exports = router;
