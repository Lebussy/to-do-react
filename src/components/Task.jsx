import TaskNote from './TaskNote'
const Task = ({task:{task, id, done, note}, deleteTask, toggleDone}) => {
    return (
        <div>
            <li style={{ fontWeight: 'bold' }}>{task + " "}  
                <button onClick={() => toggleDone(id)}>{done ? "Undo" : "Done"}</button> 
                <button onClick={() => deleteTask(id)}>Del</button>
            </li>
            <TaskNote note={note}/>
        </div>
    )
}

export default Task