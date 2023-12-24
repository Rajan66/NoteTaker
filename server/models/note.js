const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    id: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    user_id: {
        type: String,
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note