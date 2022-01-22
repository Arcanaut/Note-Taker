//requirements 
const router = require("express").Router();
// const fs = require("fs");
// const database = require("../Develop/db/db.json")
// const path = require('path')
const store = require('../Develop/db/store.js');
// const { getNotes } = require("../Develop/db/store.js");

//provides context for file paths

router.get("/notes", function (req, res) {
    // res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));

    store.getNotes()
        .then((newNote) => {
           return res.json(newNote)
        }).catch((error) => {
        res.status(500).json(error)
        })
})

//adds info for new note to database json string
router.post('/notes', (req, res) => {
    store.addNote(req.body)
        .then((newNote) => {
            res.json(newNote)
        }).catch((error) => {
        res.status(500).json(error)
        })



    // let jsonFilePath = path.join(__dirname, "../Develop/db/db.json");
    // let newNote = req.body;
    // let highestId = 50;
    // for (let i = 0; i < database.length; i++) {
    //     let individualNote = database[i];

    //     if (individualNote.id > highestId) {
    //         highestId = individualNote.id;
    //     }
    // }
    // newNote.id = highestId + 1;
    // database.push(newNote)
    //stringifies and then saves data 
    // fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("Your note was saved!");
    // });
    // res.json(newNote);
});



module.exports = router;