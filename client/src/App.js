import React, { useEffect, useState } from 'react';
import './App.css';
import controllers from './controllers/controllers';
import { Card, CardContent, TextField, Typography } from '@mui/material';

const App = () => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        (async () => {
            const tasks = await controllers.getAllTasks();
            // setTaskList(tasks.sort((a, b) => a.Status));
            setTaskList(tasks);
        })();
    }, []);

    const cardList = taskList.map(task =>
        <Card className="card" key={task.ID}>
            <CardContent className="card-content">
                <Typography sx={{ m: 0 }} variant="body1" gutterBottom>
                    {task.content}
                </Typography>
            </CardContent>
        </Card>
    )

    const handleSubmit = () => {
        alert("submit")
    }

    const handleChange = (event) => {
        setTask(event.target.value)
    }

    return (
        <div className="App">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Create Tasks" variant="filled" size="small"
                        value={task} onChange={handleChange} />
                </form>
                <div className="card-list">
                    {cardList}
                </div>
            </div>
        </div>
    );
}

export default App;
