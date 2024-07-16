const TaskNote = ({note}) => {
    if (!note) {
        return null
    }
    return (
        <>
        <p style={{ marginLeft: '20px' }}> - {note}</p>
        </>
    )
}

export default TaskNote