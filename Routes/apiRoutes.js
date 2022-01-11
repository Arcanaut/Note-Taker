

//requirements 
const express = require("express").Router;
const fs = require("fs");
const database = require("./db")


//required for post and put requests
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//provides context for file paths
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
router.route("/api/notes")
    .get(function (req, res) {
        res.json(database);
    })

//adds info for new note to database json string
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;
        let highestId = 50;
        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {
                highestId = individualNote.id;
            }
        }
        newNote.id = highestId + 1;
        database.push(newNote)
        //stringifies and then saves data 
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
        res.json(newNote);
    });


//stringifies so it can be transferred 
fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

    if (err) {
        return console.log(err);
    }
    console.log("Your note was saved!");
});
res.json(newNote);

// module.exports = router;