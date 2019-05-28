import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import TimerIcon from '@material-ui/icons/Timer'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import { ReactComponent as Checkmark } from "../icons/checkmark.svg";
import { TextField } from '../../shared/FormFields'
import Modal from './DeadLineModal'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

let timer

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(
      () => {
        setTodos(toDoList.todos);
      },
      [toDoList.id]
  )

  const handleSubmit = (event, todo_data) => {
    if (typeof event !== "undefined")
      event.preventDefault()
    saveToDoList(toDoList.id, { todos: todo_data })
  }

  const handleChange = (event, index) => {
    console.log('input: ', event.target.value)
    const todo_data = [...todos.slice(0, index),
      {description: event.target.value, complete_time: todos[index].complete_time, completed: todos[index].completed},
      ...todos.slice(index + 1)]

    // Send a request to update the state
    setTodos(todo_data)

    clearTimeout(timer);
    timer = setTimeout(function () {
      handleSubmit(event, todo_data)
    }, 1200, todo_data)
  }

  const addTodo = () => {
    let tempTodo = {description: "", complete_time: Date.now(), completed: false}
    let temp_data = [...todos, tempTodo]
    setTodos(temp_data)
    handleSubmit(undefined, temp_data)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='headline' component='h2'>
            {toDoList.name + " "}
            {todos.filter(t => !t.completed).length === 0
                ? <Checkmark/> : ""}
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form}>
            {todos.map((todo, index) => (
                <div key={index} className={classes.todoLine}>
                  <Typography className={classes.standardSpace} variant='title'>
                    {index + 1}
                  </Typography>
                  <TextField
                      label='What to do?'
                      value={todo.description}
                      onChange={event => handleChange(event, index)}
                      className={classes.textField}
                  />
                  <Checkbox
                      checked={todo.completed}
                      inputProps={{ 'aria-label': 'Checkbox A' } }
                      onChange={() => {
                        todo.completed = !todo.completed
                        handleSubmit(undefined, todos)
                      }}
                  />
                  <Modal show={isOpen}
                         onClose={toggleModal}>
                    Here's some content for the modal
                  </Modal>
                  <Button
                      size='small'
                      color='secondary'
                      className={classes.standardSpace}
                      onClick={() => {
                        todos.splice(index, 1);
                        setTodos(todos);
                        handleSubmit(undefined, todos)
                      }}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
            ))}
            <CardActions>
              <Button
                  type='button'
                  color='primary'
                  onClick={() => {
                    addTodo()
                  }}
              >
                Add Todo <AddIcon />
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
  )
}