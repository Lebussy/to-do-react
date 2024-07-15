import { useState, useEffect } from "react"
import TasksDisplay from "./components/TasksDisplay"
import tasksService from "./services/tasks"
import TaskField from "./components/TaskField"
import tasks from "./services/tasks"
import Notification from "./components/Notification"


// TODO: Adding notes attached to the task. Can be atted at the task creation or can be added afterwards
// TODO: Add an optional due date for the task.


const App = () => {
  // State for storing the task data
  const [tasksData, setTasksData] = useState([])
  // State for controlling the new task input field
  const [newTaskInput, setNewTaskInput] = useState("")
  // State for the notification message
  const [notification, setNotification] = useState(null)

  // Method for controlling the new task input
  const handleTaskInputChange = (event) => {
    setNewTaskInput(event.target.value)
  }

  // Effect for fetching the tasks data from the json server
  useEffect(() => {
    tasksService.getAll().then(data => setTasksData(data)).catch(err => {
      setTasksData([])
    })
  }, [])

  // Method for adding a new task to the database
  const addTask = (event) => {
    event.preventDefault()
    const newTaskObj = {
      task: newTaskInput,
      done: false,
      position: getNextTaskPosition()
    }
    tasksService.create(newTaskObj).then(addedTask => {
      setTasksData(tasksData.concat(addedTask))
    })
    setNewTaskInput("")
  }

  // Method for getting the next available task-position
  const getNextTaskPosition = () => {
    return Math.max(...tasksData.map(task => task.position)) + 1
  }

  // Method for deleting a task from the database
  const deleteTask = (taskId) => {
    tasksService.deleteTask(taskId).catch(() => notify("Oops! That task was no longer in the database!", true))
    // Filters out the deleted task from the tasks state
    setTasksData(tasksData.filter(task => task.id !== taskId))
  }

  // Method for toggling the done property of a task object in the database
  const toggleDone = (taskId) => {
    const taskToUpdate = tasksData.find(task => task.id === taskId)
    const updatedTaskObject = {...taskToUpdate, "done": !taskToUpdate.done}

    tasksService.updateTask(updatedTaskObject)
    .then(updated => {
      setTasksData(tasksData.map(task => {
        notify("Nice!", false)
        return task.id !== taskId
        ? task
        : updated
      }))})
    .catch(err => {
      notify("Looks like that task was no longer in the database!", true)
      setTasksData(tasksData.filter(task => task.id !== taskId))
    })
  }

  // TODO: Method for deleting the done tasks
  const clearDone = async () => {
    if (window.confirm("Are you sure? This will delete all done tasks and cannot be undone.")){
      tasksData.filter(task => task.done).forEach(task => {
        tasksService.deleteTask(task.id)
      })
      setTasksData(tasksData.filter(task => !task.done))
    }
  }

  // Method for creating the pop-up notification
  const notify = (message, isError) => {
    setNotification({
      message,
      isError
    })
    setTimeout(()=> setNotification(null), 2000)
  }


  return (
    <>
    <Notification notification={notification}/>
    <h1>TODO:</h1>
      <TasksDisplay tasks={tasksData.filter(task => !task.done)}
        deleteTask={deleteTask}
        toggleDone={toggleDone}/>
      <TaskField 
        addTask={addTask} 
        newTaskInput={newTaskInput} 
        handleTaskInputChange={handleTaskInputChange}
      />
    <h2>Completed:</h2>
    <button onClick={clearDone}>Clear done</button>
    <TasksDisplay tasks={tasksData.filter(task => task.done)}
        deleteTask={deleteTask}
        toggleDone={toggleDone}/>
    </>
      
  )
}

export default App
