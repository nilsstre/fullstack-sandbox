import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import { TextField } from '../../shared/FormFields'

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

  const handleSubmit = event => {
    console.log("handleSubmit")

    if (typeof event !== "undefined")
      event.preventDefault()

    saveToDoList(toDoList.id, { todos })
  }

  const handleComplete = (checked, index) => {
    setTodos([ // immutable update
      ...todos.slice(0, index),
      {description: todos[index].description, complete_time: todos[index].complete_time, completed: checked},
      ...todos.slice(index + 1)
    ])
    handleSubmit()
  }

  const handleChange = (event, index) => {
    setTodos([ // immutable update
      ...todos.slice(0, index),
      {description: event.target.value, complete_time: todos[index].complete_time, completed: todos[index].completed},
      ...todos.slice(index + 1)
    ])
    clearTimeout(timer);
    timer = setTimeout(function () {
      handleSubmit(event)
    }, 1000)
  }

  const handleAdd = (event) => {
    setTodos([...todos, {description: "", complete_time: Date.now(), completed: false}])
    handleSubmit(event)
  }


  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='headline' component='h2'>
            {todos.filter(t => !t.completed).length === 0
                ? <s>{toDoList.name}</s>
                : toDoList.name}
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
                      onChange={(event, checked) => handleComplete(checked, index)}
                  />
                  <Button
                      size='small'
                      color='secondary'
                      className={classes.standardSpace}
                      onClick={() => {
                        setTodos([ // immutable delete
                          ...todos.slice(0, index),
                          ...todos.slice(index + 1)
                        ])
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
                  onClick={(event) => {
                    handleAdd(event)
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