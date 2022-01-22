const fs = require('fs');
const util = require('util');
const {v4: uuidv4} = require('uuid');

//allows us to read files asyncronously
const readFileAsync = util.promisify(fs.readFile);

//allows us to write files asyncronously
const writeFileAsync = util.promisify(fs.writeFile);


class Store {
    read(){
        return readFileAsync('Develop/db/db.json', 'utf8')
    }


    write(note){
        return writeFileAsync('Develop/db/db.json',JSON.stringify(note));
    }

    getNotes(){
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                parsedNotes = [];
            }
            return parsedNotes;


        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    addNote(note){
    const { title, text } = note
    if (!title || !text) {
        throw new Error('fields must have entries')
    }

    const newNote = { title, text, id: uuidv4() }
    return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote)
        
    }

    removeNote(id){

       return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id ))
        .then(filteredNotes => this.write(filteredNotes))

        
    }
}
module.exports = new Store()