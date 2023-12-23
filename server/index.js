const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const noteRoutes = require('./routes/notes')
const middleware = require('./middleware')

const app = express()
dotenv.config()


app.use(cors())
app.use(bodyParser.json({ extended: true }))

app.use('/notes', noteRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Herroo everynyan!🙌🏻')
})

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Magic is happening on port:${PORT}`)))
    .catch((error) => console.log(error.message))
