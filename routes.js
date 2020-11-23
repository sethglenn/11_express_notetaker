const path = require("path");
const router = require("express").router();

router.get("/notes", (_req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));

})

router.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));

})

module.exports = router;
