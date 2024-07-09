import { useState, useEffect } from "react"
import TasksDisplay from "./components/TasksDisplay"
import tasksService from "./services/tasks"
import TaskField from "./components/TaskField"


const App = () => {
  // State for storing the task data
  const [tasksData, setTasksData] = useState([])
  // State for controlling the new task input field
  const [newTaskInput, setNewTaskInput] = useState("")

  // Method for controlling the new task input
  const handleTaskInputChange = (event) => {
    setNewTaskInput(event.target.value)
  }

  // Effect for fetching the tasks data from the json server
  useEffect(() => {
    tasksService.getAll().then(data => setTasksData(data)).catch(err => setTasksData(null))
  })

  // Method for adding a new task to the database
  const addTask = (event) => {
    event.preventDefault()
    console.log("addNewTask called")
    const newTaskObj = {
      task: newTaskInput,
      done: false
    }
    tasksService.create(newTaskObj).then(addedTask => {
      console.log("Response task from server: ", addedTask)
      setTasksData(tasksData.concat(addedTask))
    })
  }

  return (
    <>
    <h1>TODO:</h1>
      <TasksDisplay tasks={tasksData}/>
      <TaskField 
        addTask={addTask} 
        newTaskInput={newTaskInput} 
        handleTaskInputChange={handleTaskInputChange}
      />
    </>
      
  )
}

export default App
