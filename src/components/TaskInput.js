function TaskInput(props) {
    return (
        <div className="input-group mb-3">
            <input type="text"
                className={`form-control`}
                placeholder="Add a task "
                aria-label="Recipient's username"
                aria-describedby="button-addon2" 
                autoComplete="off"
                id="task"
                value={props.taskTitle}
                onChange={(e) => {
                    props.setTaskTitle(e.target.value);
                }}  
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        props.addTask();
                        e.target.blur();
                    }
                }}
            />
            <button
                onClick={props.addTask}
                className="btn btn-outline-secondary "
                type="button"
                id="button-addon2"
            > Add
        </button>
    </div>
    )
}   
export default TaskInput;