//requirements 
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db")

//sets up express middleware and port location to create a server 
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static('public'));

//required for post and put requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//provides context for file paths
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
app.route("/api/notes")
    .get(function (req, res) {
        res.json(database);
    })

//adds info for new note to database json string
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;
        let highestId = 99;
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

//allows deletion of notes
    app.delete("/api/notes/:id", function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        // request to delete note by id.
        for (let i = 0; i < database.length; i++) {
    
            if (database[i].id == req.params.id) {
                // Splice takes i position, and then deletes the 1 note.
                database.splice(i, 1);
                break;
            }
        }});
//stringifies so it can be transferred 
fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

    if (err) {
        return console.log(err);
    }
    console.log("Your note was saved!");
});
res.json(newNote);
