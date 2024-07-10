const TaskField = ({addTask, handleTaskInputChange, newTaskInput, toggleDone}) => {
    return (
        <form onSubmit={addTask}>
            <input value={newTaskInput} onChange={handleTaskInputChange}/>
            <button type="submit">Add New Task</button>
        </form>
    )
}

export default TaskField
