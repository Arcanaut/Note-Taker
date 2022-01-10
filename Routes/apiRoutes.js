//require the express.router module for routes
const router = require('express').Router();
//require the db.json file to read and write notes data
const notes = require('../db/db.json');
//Require the file system node module for read write functionality to the json data file
const fs = require('fs');



//function to write data to the db.json file
var writeFile = (notes) => {
    notes = JSON.stringify(notes);
    // Use fs module to write data to the database json file
    fs.writeFileSync("./db/db.json", notes, function(err){
        if (err) {
            return console.log(err);
        }
    });
}

//get api route to return all notes
router.get("/notes", (req, res) => {
    //respond with content of db.json
    res.json(notes);
    //console log to let dev know this route is working
    console.log("current notes: " + JSON.stringify(notes))
});

// post api route to add a new note
router.post("/notes", (req, res) => {
//Create a unique ID for each note so user doesn't have to
    // if this is the first note set ID to 0
    if (notes.length == 0){
        req.body.id = "0";
    } 
    //if it's not the first note, take the last note in the file and add 1 to it's id number for this new note
    else{
        req.body.id = JSON.stringify(JSON.parse(notes[notes.length - 1].id) + 1);
    }
    //add new note entry to the db.json file
    notes.push(req.body);
    writeFile(notes);
    //return the newly entered note.
    res.json(req.body);
    //console log to let dev know this route is working
    console.log(req.body.title + " saved to notes.")
});

//delete api route to remove a note
router.delete("/notes/:id", (req, res) => {
    // take ID parameter and convert it to a string
    let id = req.params.id.toString();
    
    //loop through each note in the json file starting with the first note as 0.
    for (i=0; i < notes.length; i++){
       //if the id for a note matches the ID parameter of the delete request
        if (notes[i].id == id){
            // send the note as the response
            res.send(notes[i]);

            // remove the note from the notes array
            notes.splice(i,1);
            //exit the for loop
            break;
        }
    }
    // re-write db without deleted note
    writeFile(notes);
    console.log("note " + id + " deleted from notes.")
});

//export all routes and writeFile function
module.exports = router, writeFile;