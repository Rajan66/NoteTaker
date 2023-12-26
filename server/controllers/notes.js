const mongoose = require('mongoose')
const Note = require('../models/note')

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user_id: req.userId }).sort({ updatedAt: -1 })
        res.status(200).json(notes)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


const getNote = async (req, res) => {
    const { id: _id } = req.params
    try {
        const note = await Note.findById(_id)
        res.status(200).json(note)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createNote = async (req, res) => {
    const note = req.body
    const newNote = new Note({ ...note, user_id: req.userId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    try {
        await newNote.save()
        res.status(201).json(newNote)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

}

const updateNote = async (req, res) => {
    const { id: _id } = req.params
    const body = req.body
    try {
        const updatedNote = await Note.findByIdAndUpdate(_id, { ...body, updatedAt: new Date().toISOString(), _id }, { new: true })
        res.status(200).json(updatedNote)
    } catch (error) {
        res.status(404).json({ message: 'No note with that id!' })
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params
    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(404).send('No note with that id');
    }
}


module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}
