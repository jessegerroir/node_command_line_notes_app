const fs = require('fs')
const chalk = require('chalk');

const getNotes = () => {
    
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title == title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(chalk.green.inverse(note.body))
    } else {
        console.log(chalk.red('Note not found'))
    }

}

const listNotes = () => {
    console.log(chalk.green("Your Notes:"))
    const notes = loadNotes();
    notes.forEach( (note) => { 
        console.log(note.title) 
    })
}

const addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
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

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes))

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } catch (e) {
        return []
    }
}

const removeNotes = (title) => {
    // Load notes
    const notes = loadNotes();
    // Filter out matching note
    const remainingNotes = notes.filter( (note) => note.title !== title )

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
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}