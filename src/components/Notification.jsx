const inlineStyles = {
    error : {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      },
    
    success: {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
}

const Notification = ({notification}) => {
    if (notification === null){
        return null
    }
    return (
        <div style={notification.isError? inlineStyles.error : inlineStyles.success}>{notification.message}</div>
    )
}

export default Notification