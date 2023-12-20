const Note = require('../models/note')

const getNotes = async (req, res) => {
    try {
        const notes = Note.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


const getNote = async (req, res) => { }

const createNote = async (req, res) => {
    const note = req.body
    console.log(note)
    const newNote = new Note({ ...note, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    try {
        await newNote.save()
        res.status(201).json(newNote)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

const updateNote = async (req, res) => { }

const deleteNote = async (req, res) => { }

module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}
