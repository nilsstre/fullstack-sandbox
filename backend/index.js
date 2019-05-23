const express = require('express')
const app = express()

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))
const api = require('./api/');

app.use('/api', api)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
