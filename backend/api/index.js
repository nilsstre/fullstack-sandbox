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
        let listFound
        data.map((todos) => {
            if (todos.list_id == list_id) {
                listFound = true
                return res.status(200).send({
                    success: 'true',
                    message: 'The todo list with list_id: ' + list_id + ' was retrieved successfully',
                    todos: todos
                })
            }
        })
        if (!listFound) {
            return res.status(404).send({
                success: 'false',
                message: 'There exists no todo list with the list_id: ' + list_id
            })
        }
    } else {
        return res.status(200).send({
            data
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

        }
    })
    return res.status(404).send({
        success: 'false',
        message: 'There exists no todo with the todo_id: ' + todo_id + ' in the todo list with the todo_id: ' + todo_id
    })
}

/**
 * API endpoint that returns all todo lists
 */
routs.get('/todos/', (req, res) => {
    console.log("Request for todo list received")
    getList(req, res)
})

/**
 * API endpoint that returns the todo list specified by list_id
 */
routs.get('/todos/:list_id', (req, res) => {
    const list_id = parseInt(req.params.list_id, 10)
    if (isNaN(list_id)) {
        return res.status(400).send({
            success: 'false',
            message: 'List_id must be an integer'
        })
    } else {
        getList(req, res, list_id)
    }
})

/**
 * API endpoint for adding todos
 * TODO split into a function
 */
routs.post('/todos/:list_id', (req, res) => {
    const list_id = parseInt(req.params.list_id, 10)
    if (isNaN(list_id)) {
        return res.status(400).send({
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
        let todoFound
        data.map((todos) => {
            if (todos.list_id == list_id) {
                todoFound = true
                temp_todo = {
                    todo_id: todos.list_todos.length + 1, // TODO fix unique todo_id
                    description: req.body.description,
                    complete_time: req.body.complete_time,
                    completed: req.body.completed
                }
                todos.list_todos.push(temp_todo)
                return res.status(201).send({
                    success: 'true',
                    message: 'The todo was added with todo_id ' + todos.list_todos.length
                })
            }
        })
        if (!todoFound) {
            return res.status(404).send({
                success: 'false',
                message: 'There exists no todo with the todo_id: ' + todo_id + ' in list: ' + list_id
            })
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
        return res.status(400).send({
            success: 'false',
            message: 'Both list_id and todo_id have to be integers'
        })
    } else {
        deleteTodo(list_id, todo_id, req, res)
    }
})

/**
 * API endpoint for updating a todo
 */
routs.put('/todos/:list_id/:todo_id', (req, res) => {
    const list_id = parseInt(req.params.list_id, 10)
    const todo_id = parseInt(req.params.todo_id, 10)

    if (isNaN(list_id) || isNaN(todo_id)) {
        return res.status(400).send({
            success: 'false',
            message: 'Both list_id and todo_id have to be integers'
        })
    } else if (!req.body.description || !req.body.complete_time || !req.body.completed)  {
        return res.status(400).send({
            success: 'false',
            message: ''
        })
    } else {
        let todoListFound
        let todoFound
        let foundIndex
        data.map((todos) => {
            if (todos.list_id == list_id) {
                todos.list_todos.map((todo, index) => {
                    if (todo.todo_id == todo_id) {
                        todoListFound = todos
                        todoFound = todo
                        foundIndex = index
                    }
                })
            }
        })
        if (!todoFound) {
            return res.status(404).send({
                success: 'false',
                message: 'There is no todo with the todo_id: ' + todo_id + 'in todo list: ' + list_id
            })
        } else {
            const todo_temp = {
                todo_id: todoFound.todo_id,
                description: req.body.description || todoFound.description,
                complete_time: req.body.complete_time || todoFound.complete_time,
                completed: req.body.completed || todoFound.completed
            }
            todoListFound.list_todos.splice(foundIndex, 1, todo_temp)

            return res.status(200).send({
                success: 'true',
                message: 'The todo with todo_id ' + todo_id + ' in todo list: ' + list_id + ' has been successfully updated',
                todo_temp
            })
        }
    }

})

module.exports = routs