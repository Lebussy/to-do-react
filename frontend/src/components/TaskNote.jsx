const TaskNote = ({note}) => {
    if (!note) {
        return <br/>
    }
    return (
        <>
        <p style={{ marginLeft: '20px' }}> - {note}</p>
        </>
    )
}

export default TaskNote