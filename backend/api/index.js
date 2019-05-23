const express = require("express");
const data = require('../data/data.js')

const routs = express.Router()

/**
* Function sends a HTTP response containing all the todo list or the todo list specified by the list_id
* @param {object} req - A HTTP request
* @param {object} res - A HTTP response
* @param {number} list_id - The id of the requested todo list, default value of id is undefined
 */
function getList(req, res, list_id = undefined) {
    if (list_id) {
        data.map((todos) => {
            if (todos.list_id == list_id) {
                return res.status(200).send({
                    success: 'true',
                    message: 'Todo list with list_id: ' + list_id + ' was retrieved successfully',
                    todos: todos
                })
            }
        })
        return res.status(404).send({
            success: 'false',
            message: 'There exists no todo list with the list_id: ' + id
        });
    } else {
        res.status(200).send({
            success: 'true',
            message: 'All Todo lists were retrieved successfully',
            todos: data
        })
    }
}

/**
* Function deletes a todo specified by the todo_id and the list_id
* @param {number} list_id - The id of the todo list containing the todo to be deleted
* @param {number} todo_id - The id of the todo to be deleted
* @param {object} req - A HTTP request
* @param {object} res - A HTTP response
 */
function deleteTodo(list_id, todo_id, req, res) {
    data.map((todos) => {
        if (todos.list_id == list_id) {
            todos.list_todos.map((todo, index) => {
                if (todo.todo_id == todo_id) {
                    todos.list_todos.splice(index, 1)
                    return res.status(200).send({
                        success: 'true',
                        message: 'The todo with the todo_id: ' + todo_id + ' has been successfully deleted'
                    })
                }
            })
            return res.status(404).send({
                success: 'false',
                message: 'There exists no todo with the todo_id: ' + todo_id + ' in the todo list with the todo_id: ' + todo_id
            })
        }
    })
    res.status(404).send({
        success: 'false',
        message: 'There exists no todo list with the list_id: ' + list_id
    })
}

/**
 * API endpoint that returns all todo lists
 */
routs.get('/todos/', (req, res) => {
    getList(req, res)
})

/**
 * API endpoint that returns the todo list specified by list_id
 */
routs.get('/todos/:list_id', (req, res) => {
    const list_id = parseInt(req.params.list_id, 10)
    if (isNaN(list_id)) {
        res.status(400).send({
            success: 'false',
            message: 'List_id must be an integer'
        })
    } else {
        getList(req, res, list_id)
    }
})

routs.post('/todos/:list_id', (req, res) => {
    const list_id = parseInt(req.params.list_id, 10)
    if (isNaN(list_id)) {
        res.status(400).send({
            success: 'false',
            message: 'List_id must be an integer'
        })
    } else if (!req.body.description)  {
        return res.status(400).send({
            success: 'false',
            message: 'A description is required for the todo'
        })
    } else if (!req.body.complete_time) {
        return res.status(400).send({
            success: 'false',
            message: 'A complete time is required for the todo'
        })
    } else if (!req.body.completed) {
        return res.status(400).send({
            success: 'false',
            message: 'Status for completed has to be set for the todo'
        })
    } else {
        const temp_todo = {

        }
    }
})

/**
 * API endpoint for deleting a todo specified by list_id and todo_id
 */
routs.delete('/todos/:list_id/:todo_id', (req, res) => {
    const list_id = parseInt(req.params.list_id, 10)
    const todo_id = parseInt(req.params.todo_id, 10)

    if (isNaN(list_id) || isNaN(todo_id)) {
        res.status(400).send({
            success: 'false',
            message: 'Both list_id and todo_id have to be integers'
        })
    } else {
        deleteTodo(list_id, todo_id, req, res)
    }
})

module.exports = routs