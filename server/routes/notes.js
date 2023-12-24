const express = require('express')
const middleware = require('../middleware')
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/notes')

const router = express.Router()

router.get('/', middleware.decodeToken, getNotes)
router.get('/:id', middleware.decodeToken, getNote)

router.post('/', middleware.decodeToken, createNote)
router.patch('/:id', middleware.decodeToken, updateNote)
router.delete('/:id', middleware.decodeToken, deleteNote)

module.exports = router