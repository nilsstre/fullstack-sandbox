const express = require("express");
const todos = require('../data/todos.js')

const routs = express.Router()

/**
 * API endpoint that returns both Todo lists
 */
routs.get('/todos/', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'All Todo lists were retrieved successfully',
        todos: todos
    })
})

module.exports = routs