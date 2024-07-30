import axios from "axios";

const restUrl = "http://localhost:3001/tasks"

const getAll = () => {
    const getTasksRequest = axios.get(restUrl)
    return getTasksRequest.then(response => {
        return response.data});
}

const create = (task) => {
    const createPostRequest = axios.post(restUrl, task)
    return createPostRequest.then(response => response.data)
}

const deleteTask = (id) => {
    const deleteRequest = axios.delete(`${restUrl}/${id}`)
    return deleteRequest.then(response => response.data)
}

const updateTask = (newTaskObj) => {
    const updateTaskRequest = axios.put(`${restUrl}/${newTaskObj.id}`, newTaskObj)
    return updateTaskRequest.then(response => response.data)
}

export default {getAll, create, deleteTask, updateTask}