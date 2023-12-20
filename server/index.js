const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
dotenv.config()

app.use(cors())
app.use(bodyParser.json({ extended: false }))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Herroo everynyan!🙌🏻')
})

app.listen(PORT, () => console.log(`Magic is happening on port:${PORT}`))