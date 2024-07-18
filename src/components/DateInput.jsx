const DateInput = ({showDueDateInput, dueDate, handleDateChange}) => {
  if (!showDueDateInput){
    return null
  }
  return (
    <div> 
      <legend>Due</legend>
      <input type="date" value={dueDate} onChange={handleDateChange}/>
    </div>
  )
}

export default DateInput