const express = require('express')
const middleware = require('../middleware')
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/notes')

const router = express.Router()

router.get('/', middleware.decodeToken, getNotes)
router.get('/:id', middleware.decodeToken, getNote)

router.post('/', createNote)
router.patch('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router