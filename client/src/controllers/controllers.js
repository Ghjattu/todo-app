import axios from 'axios';

const baseUrl = "http://localhost:8080/api/tasks";

const getAllTasks = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createTask = async (newTask) => {
    const res = await axios.post(baseUrl, newTask);
    return res.data;
};

const doneTask = async (id) => {
    const res = await axios.put(`${baseUrl}/${id}/done`);
    return res.data;
};

const undoTask = async (id) => {
    const res = await axios.put(`${baseUrl}/${id}/undo`);
    return res.data;
}

const deleteTaskByID = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
}

const controllers = { getAllTasks, createTask, doneTask, undoTask, deleteTaskByID };

export default controllers;