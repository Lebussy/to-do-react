import DateInput from './DateInput'
const TaskField = ({addTask, handleTaskInputChange, newTaskInput, newNoteInput, handleNoteInputChange, dueDate, handleDateChange, showDueDateInput, toggleShowDueDateInput}) => {
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
            <div>
              <button type='button' onClick={toggleShowDueDateInput}>{showDueDateInput? "Remove Due-Date" : "Add Due-Date"}</button>
              <DateInput dueDate={dueDate} handleDateChange={handleDateChange} showDueDateInput={showDueDateInput}/>
            </div>
              <br></br>
              <button type="submit" style={{color: "lightblue", backgroundColor: "orange"}}>Add Task</button>
            
        </form>
    )
}

export default TaskField
