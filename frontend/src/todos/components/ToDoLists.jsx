import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import { ToDoListForm } from './ToDoListForm'
import axios from 'axios'


const sendList = (list) => {
    axios.post('http://localhost:3001/api/todos', list).catch(error => {
        console.error('Error while sending list to server, error: ' + error)
        alert("There was an error while seo")
    })

}


export const ToDoLists = ({ style }) => {
    const [toDoLists, setToDoLists] = useState({})
    const [activeList, setActiveList] = useState()

    const getList = () => {
        axios.get('http://localhost:3001/api/todos/').then(response => {
            response.data.data.map(t => {setToDoLists(t)
            console.log(t)})
        })
            .catch(error => {console.error('Error while retrieving lists from server, error: ' + error)})
    }

    useEffect(() => {
        getList()
    }, [])

    if (!Object.keys(toDoLists).length) return null
    return <Fragment>
        <Card style={style}>
            <CardContent>
                <Typography
                    variant='headline'
                    component='h2'
                >
                    My ToDo Lists
                </Typography>
                <List>
                    {Object.keys(toDoLists).map((key) => <ListItem
                        key={key}
                        button
                        onClick={() => setActiveList(key)}
                    >
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary={toDoLists[key].name}/>
                    </ListItem>)}
                </List>
            </CardContent>
        </Card>
        {toDoLists[activeList] && <ToDoListForm
            key={activeList} // use key to make React recreate component to reset internal state
            toDoList={toDoLists[activeList]}
            saveToDoList={(id, { todos }) => {

                const listToUpdate = toDoLists[id]
                const newList = {
                    ...toDoLists,
                    [id]: {...listToUpdate, todos}
                };

                sendList(newList)

                setToDoLists(newList)
            }}
        />}
    </Fragment>
}
