//requirements 
const router = require("express").Router();
const fs = require("fs");

// const path = require('path')
const {v4: uuidv4} = require('uuid');

//provides context for file paths
//gets notes from db.json array
router.get("./notes", function (req, res) {
   res.json(db).catch((error) => {
    res.status(500).json(error)}
)});

// return res.json(newNote)
//         }).catch((error) => {
        // res.status(500).json(error)
//         })

//adds info for new note to database json string
router.post('/notes', (req, res) => {
    const newNote = req.body;
    //gives new note a unique ID
    newNote.id = uuidv4();
    //pushes new note in to db.json array
    db.push(newNote);
    

});

// .catch((error) => {
        //     res.status(500).json(error)
        //     })

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

module.exports = router;