const express = require("express");
const data = require('../data/data.js')

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
    data.map((todos, index) => {
        if (todos.list_id == req.body.list_id) {
            todos.list_todos = req.body.list_todos
            return res.status(201).send({
                message: 'the list with the list_id: ' + todos.list_id + ' was updated'
            })
        }
    })
})

module.exports = routs