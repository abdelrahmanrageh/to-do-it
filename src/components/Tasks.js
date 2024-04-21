import Task from "./Task";
function Tasks(props) {
    return (
        <>
            <h2>Tasks</h2>
            {props.tasks.length > 0 &&
                props.tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            onDelete={() => props.deleteTask(task.id)}
                            onDone={() => props.onDone(task.id)}
                            onEdit={() => props.openEditTask(task.id)}
                        />
                    )
                })
            }
            {props.tasks.length === 0 &&
                <div>
                    <img className="empty-tasks-img" src={props.emptyPhoto} alt='tasks' />
                    <h3>No tasks yet</h3>
                </div>
            }
        </>
    )
}
export default Tasks;