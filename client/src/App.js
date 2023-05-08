import React, { useEffect, useState } from 'react';
import './App.css';
import controllers from './controllers/controllers';
import { Card, CardContent, TextField, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const App = () => {
    const [content, setContent] = useState("");
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        (async () => {
            const tasks = await controllers.getAllTasks();
            setTaskList(tasks.sort((a, b) => a.status - b.status));
        })();
    }, []);

    const handleDoneClick = async (id) => {
        const returnedTask = await controllers.doneTask(id);
        const newTaskList = taskList.map(task => {
            const newTask = task;
            if (newTask.ID === returnedTask.ID) {
                newTask.status = returnedTask.status;
            }
            return newTask;
        });
        setTaskList(newTaskList.sort((a, b) => a.status - b.status));
    }

    const handleUndoClick = async (id) => {
        const returnedTask = await controllers.undoTask(id);
        const newTaskList = taskList.map(task => {
            const newTask = task;
            if (newTask.ID === returnedTask.ID) {
                newTask.status = returnedTask.status;
            }
            return newTask;
        });
        setTaskList(newTaskList.sort((a, b) => a.status - b.status));
    }

    const handleDeleteClick = async (id) => {
        await controllers.deleteTaskByID(id);
        const newTaskList = taskList.filter(task => task.ID !== id);
        setTaskList(newTaskList);
    }

    const cardList = taskList.map(task =>
        <Card className="card" key={task.ID}>
            <CardContent className="card-content" sx={{ py: ".6rem" }}>
                <Typography sx={{ m: 0, fontWeight: 'medium' }} variant="body1" gutterBottom>
                    {
                        task.status ? (<del>{task.content}</del>) : (task.content)
                    }
                </Typography>
                <div className="menu">
                    <div className="menu-done" onClick={() => handleDoneClick(task.ID)}>
                        <TaskAltIcon fontSize="small" />
                        <Typography sx={{ m: 0, pl: ".2rem" }} display="inline" variant="body2" gutterBottom>Done</Typography>
                    </div>
                    <div className="menu-undo" onClick={() => handleUndoClick(task.ID)}>
                        <HighlightOffIcon fontSize="small" />
                        <Typography sx={{ m: 0, pl: ".2rem" }} display="inline" variant="body2" gutterBottom>Undo</Typography>
                    </div>
                    <div className="menu-delete" onClick={() => handleDeleteClick(task.ID)}>
                        <DeleteForeverIcon fontSize="small" />
                        <Typography sx={{ m: 0, pl: ".2rem" }} display="inline" variant="body2" gutterBottom>Delete</Typography>
                    </div>
                </div>
            </CardContent>
        </Card >
    )

    const handleSubmit = async (event) => {
        event.preventDefault();

        const returnedTask = await controllers.createTask({ content: content, status: false });
        setTaskList(taskList.concat(returnedTask));
        setContent("");
    }

    const handleChange = (event) => {
        setContent(event.target.value);
    }

    return (
        <div className="App">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Create Tasks" variant="filled" size="small"
                        value={content} onChange={handleChange} />
                </form>
                <div className="card-list">
                    {cardList}
                </div>
            </div>
        </div>
    );
}

export default App;
