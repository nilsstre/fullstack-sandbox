const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api/');
const app = express()
const PORT = 3001

app.use(bodyParser.json()); // Must for some reason be called first
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))