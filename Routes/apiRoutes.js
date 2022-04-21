//requirements 
const router = require("express").Router();
const store = require("../db/store")


//provides context for file paths
//gets notes from db.json array
router.get("/notes", function (req, res) {
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(error => res.status(500).json(error))
});


//adds info for new note to database json string
router.post('/notes', (req, res) => {
    store
        .addNote(req.body)
        .then(note => res.json(note))
        .catch(error => res.status(500).json(error))   
});

//deletes notes
router.delete('/notes/:id', (req, res) =>{
    store
        .removeNote(req.params.id)
        .then(() => res.json({
            ok: true
        }))
        .catch(error => res.status(500).json(error))  
})

module.exports = router;