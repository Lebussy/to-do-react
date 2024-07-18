import Task from './Task'
const TasksDisplay = ({tasks, deleteTask, toggleDone}) => {
    if (tasks){
        return (
            <ul>
             {tasks.map(task => <Task 
                key={task.id} 
                task={task} 
                deleteTask={deleteTask}
                toggleDone={toggleDone}/>)}
            </ul>
        )
    }
    return (
        <div>Could not load task data</div>
    )
}

export default TasksDisplay