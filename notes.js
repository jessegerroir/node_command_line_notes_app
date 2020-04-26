const fs = require('fs')
const chalk = require('chalk');

const getNotes = function(){
    return "This is a note!";
}

const addNotes = function (title, body){
    const notes = loadNotes()
    
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added'))
    } else {
        console.log(chalk.red('Note title taken'))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNotes = function (title) {
    // Load notes
    const notes = loadNotes();
    // Filter out matching note
    const remainingNotes = notes.filter( function(note) {
        return note.title !== title;
    });
    // Compare lengths to notes arrays to see if we removed one
    if (notes.length > remainingNotes.length) {
        // Save notes
        saveNotes(remainingNotes);
        console.log(chalk.green('Note Removed!'))
    }else{
        console.log(chalk.red('Note was not found!'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes
}