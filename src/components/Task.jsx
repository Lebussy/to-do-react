import TaskNote from './TaskNote'
const Task = ({task:{task, id, done, note}, deleteTask, toggleDone}) => {
    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>{task + " "}  
                <button onClick={() => toggleDone(id)}>{done ? "Undo" : "Done"}</button> 
                <button onClick={() => deleteTask(id)}>Del</button>
            </p>
            <TaskNote note={note}/>
        </div>
    )
}

export default Task