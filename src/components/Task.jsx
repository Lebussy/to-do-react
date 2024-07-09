const Task = (props) => {
    const {task: {task}} = props
    return (
        <div>
            <p>{task}</p>
        </div>
    )
}

export default Task