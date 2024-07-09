import axios from "axios";

const restUrl = "http://localhost:3001/tasks"

const getAll = () => {
    const getTasksRequest = axios.get(restUrl)
    return getTasksRequest.then(response => response.data);
}

const create = (task) => {
    const createPostRequest = axios.post(restUrl, task)
    return createPostRequest.then(response => response.data)
}

export default {getAll, create}