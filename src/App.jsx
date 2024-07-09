import { useState, useEffect } from "react"
import TasksDisplay from "./components/TasksDisplay"
const App = () => {
  // State for storing the task data
  const [tasksData, setTasksData] = useState([
    {
        "id": 1,
        "task": "Clean dishes",
        "done": false
    },
    {
        "id": 2,
        "task": "Make dinner",
        "done": false
    },
    {
        "id": 3,
        "task": "Duolingo",
        "done": false
    }])

  

  return (
    <>
    <h1>TODO:</h1>
    <TasksDisplay tasks={tasksData}/></>
  )
}

export default App
