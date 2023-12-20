const express = require('express')
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/notes')

const router = express.Router()

router.get('/', getNotes)
router.get('/', getNote)

router.post('/', createNote)
router.patch('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router