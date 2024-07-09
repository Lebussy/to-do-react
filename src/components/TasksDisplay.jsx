import Task from './Task'
const TasksDisplay = ({tasks}) => {
    if (tasks){
        return (
            <>
             {tasks.map(task => <Task key={task.id} task={task}/>)}
            </>
        )
    }
    return (
        <div>Could not load task data</div>
    )
}

export default TasksDisplay