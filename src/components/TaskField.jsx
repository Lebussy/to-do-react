const TaskField = ({addTask, handleTaskInputChange, newTaskInput, newNoteInput, handleNoteInputChange}) => {
    return (
        <form onSubmit={addTask}>
            <div>
                <legend>Task</legend>
                <input value={newTaskInput} onChange={handleTaskInputChange}/>
            </div>
            <div>
                <legend>Task notes</legend>
                <textarea placeholder="optional" value={newNoteInput} onChange={handleNoteInputChange}/>
            </div>
            <button type="submit">Add New Task</button>
        </form>
    )
}

export default TaskField
