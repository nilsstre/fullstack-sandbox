const express = require("express");
let data = require('../data/data.js')

const routs = express.Router()

/**
 * Returns all the todo lists
 */
routs.get('/todos/', (req, res) => {
    console.log("Request for todo list received")
    return res.status(200).send({
        data
    })
})

/**
 * Adds a new version of a list
 */
routs.post('/todos/', (req, res) => {
    console.log(req.body)
    data = req.body
    return res.status(201).send({
        message: "saved lists to sever"
    })
})

module.exports = routs