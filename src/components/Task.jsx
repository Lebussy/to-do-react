import TaskNote from './TaskNote'
const Task = ({task:{task, id, done, note, due}, deleteTask, toggleDone}) => {

    return (
        <div>
            <li>
              <b>{task}</b>{` ${due? `(Due: ${due}) ` : ""}`}
              <button onClick={() => toggleDone(id)}>{done ? "Undo" : "Done"}</button> 
              <button onClick={() => deleteTask(id)}>Del</button>
            </li>
            <TaskNote note={note}/>
        </div>
    )
}

export default Task