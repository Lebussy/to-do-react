const Task = ({task:{task, id, done}, deleteTask, toggleDone}) => {
    return (
        <div>
            <p>{task + " "}  
                <button onClick={() => toggleDone(id)}>{done ? "Undo" : "Done"}</button> 
                <button onClick={() => deleteTask(id)}>Del</button>
            </p>
        </div>
    )
}

export default Task