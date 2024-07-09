import Task from './Task'
const TasksDisplay = ({tasks}) => {
    return (
        <>
         {tasks.map(task => <Task key={task.id} task={task}/>)}
        </>
    )
}

export default TasksDisplay