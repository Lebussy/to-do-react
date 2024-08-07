import { useState, useEffect } from "react"
import TasksDisplay from "./components/TasksDisplay"
import tasksService from "./services/tasks"
import TaskField from "./components/TaskField"
import tasks from "./services/tasks"
import Notification from "./components/Notification"

// TODO: Add an optional due date for the task.

// TODO: Consider, do we want exposure of notes to be optional?

// TODO: Add local weather? - see countries task app

const App = () => {
  // State for storing the task data
  const [tasksData, setTasksData] = useState([])
  // State for controlling the new task input field
  const [newTaskInput, setNewTaskInput] = useState("")
  // State for the notification message
  const [notification, setNotification] = useState(null)
  // State for controlling the notes input for the task
  const [newNoteInput, setNewNoteInput] = useState("")
  // State for controlling the due date of the task
  const [dueDate, setDueDate] = useState('')
  // State for showing due date field
  const [showDueDateInput, setShowDueDateInput] = useState(false)

  // For toggling if the due date input is shown
  const toggleShowDueDateInput = (event) => {
    event.preventDefault()
    setShowDueDateInput(!showDueDateInput)
  }

  // For controlling the due date input
  const handleDateChange = (event) => {
    setDueDate(event.target.value)
  }

  // Method for controlling the note input of the new task
  const handleNoteInputChange = (event) => {
    setNewNoteInput(event.target.value)
  }

  // Method for controlling the new task input
  const handleTaskInputChange = (event) => {
    setNewTaskInput(event.target.value)
  }

  // Effect for fetching the tasks data from the json server
  useEffect(() => {
    tasksService.getAll().then(data => setTasksData(data)).catch(err => {
      notify("Could not connect to database", true)
      setTasksData([])
    })
  }, [])

  // Method for formatting the date into dd/mm/yy
  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year

    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
  } 

  // Method for adding a new task to the database
  const addTask = (event) => {
    event.preventDefault()
    const newTaskObj = {
      task: newTaskInput,
      note: newNoteInput === "" ? null : newNoteInput,
      done: false,
      position: getNextTaskPosition(),
      due: dueDate === "" ? null : formatDate(dueDate)
    }

    tasksService.create(newTaskObj)
      .then(addedTask => {
        setTasksData(tasksData.concat(addedTask))
      })
    setNewTaskInput("")
    setNewNoteInput("")
    setDueDate("")
    setShowDueDateInput(false)
  }

  // Method for getting the next available task-position
  const getNextTaskPosition = () => {
    const currentHighest = Math.max(...tasksData.map(task => task.position))
    return currentHighest > 0 ? currentHighest + 1 : 1
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

    // Uses the tasks service to update the task object in the database
    tasksService.updateTask(updatedTaskObject)
    .then(updated => {
      // If successful, and done === true, notifies with nice!
      if (updated.done){
        notify("Nice!", false)
      }
      // Updates the task in the apps state storing the tasks
      setTasksData(tasksData.map(task => {
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
  const clearDone = () => {
    if (window.confirm("Are you sure?")){
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
    <TaskField 
        addTask={addTask} 
        newTaskInput={newTaskInput} 
        handleTaskInputChange={handleTaskInputChange}
        newNoteInput={newNoteInput}
        handleNoteInputChange={handleNoteInputChange}
        dueDate={dueDate}
        handleDateChange={handleDateChange}
        showDueDateInput={showDueDateInput}
        toggleShowDueDateInput={toggleShowDueDateInput}
      />
    <h2>TODO:</h2>
      <TasksDisplay tasks={tasksData.filter(task => !task.done)}
        deleteTask={deleteTask}
        toggleDone={toggleDone}/>
    <h2>COMPLETED:</h2>
    <button onClick={clearDone}>Clear done</button>
    <TasksDisplay tasks={tasksData.filter(task => task.done)}
        deleteTask={deleteTask}
        toggleDone={toggleDone}/>
    </>
      
  )
}

export default App
