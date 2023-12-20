const Note = require('../models/note')

const getNotes = async (req, res) => {
    try {
        const notes = Note.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

