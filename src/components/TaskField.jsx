import DateInput from './DateInput'
const TaskField = ({addTask, handleTaskInputChange, newTaskInput, newNoteInput, handleNoteInputChange, dueDate, handleDateChange, showDueDateInput}) => {
    return (
        <form onSubmit={addTask}>
            <div>
                <legend>Task</legend>
                <input value={newTaskInput} onChange={handleTaskInputChange} required={true}/>
            </div>
            <div>
                <legend>Notes</legend>
                <textarea placeholder="optional" value={newNoteInput} onChange={handleNoteInputChange}/>
            </div>
            <DateInput dueDate={dueDate} handleDateChange={handleDateChange} showDueDateInput={showDueDateInput}/>
            <button type="submit">Add New Task</button>
        </form>
    )
}

export default TaskField
