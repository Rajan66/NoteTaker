const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
dotenv.config()

app.use(cors())
app.use(bodyParser.json({ extended: false }))

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Herroo everynyan!🙌🏻')
})

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Magic is happening on port:${PORT}`)))
    .catch((error) => console.log(error.message))
