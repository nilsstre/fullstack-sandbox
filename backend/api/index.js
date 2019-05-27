const express = require('express')
let data = require('../data/database')
let fs = require('fs');

const routs = express.Router()

/**
 * Saves JSON object to file as a string
 * @param {JSON} data The JSON object that is being saved to file
 */
function saveToFile(data) {
    fs.writeFile('./data/database.json', JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    })
}

/**
 * Returns the lists
 */
routs.get('/todos/', (req, res) => {
    return res.status(200).send({
        data
    })
})

/**
 * Adds a new version of a list
 */
routs.post('/todos/', (req, res) => {
    data = req.body
    saveToFile(data)
    return res.status(201).send({
        message: "saved lists to sever"
    })
})

module.exports = routs