import Tasks from "./Tasks";
import '../App.css';
import '../Swal.css';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import emptyPhoto from './media/emptytasks.png';
import EditTask from "./EditTask";
import TaskInput from "./TaskInput";

function Input() {  
    const [taskTitle, setTaskTitle] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [dark, setDark] = useState(JSON.parse(window.localStorage.getItem("darkMode")));
    let [tasks, setTasks] = useState(JSON.parse(window.localStorage.getItem("tasks")) || []);

    const addTask = () => {
        const newTask = {
            id : uuidv4(),
            title : taskTitle,
            date: `Added at: ${new Date().toLocaleDateString(
                undefined, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'numeric',
                    hour: 'numeric',
                    hour12: true,   
                    minute: 'numeric'
            })}`,
            done : false
        }
        taskTitle && setTasks([newTask , ...tasks]);
        setTaskTitle("");
    } 

    useEffect(() => {
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    
    useEffect(() => {
        setDark(JSON.parse(window.localStorage.darkMode));
    }, [dark]);

    const deleteTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }
    
    const onDone = (id) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    done: !task.done
                }
            }
            return task;
        });
        setTasks(newTasks);
    }

    const openEditTask = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        setInputValue(taskToEdit.title);
        setEditTaskId(id);
        setDark(JSON.parse(window.localStorage.darkMode));
        setShowPopup(true);
    }
    
    const closeEditTask = () => {
        if (inputValue.trim() === '') {
            // deleteTask(editTaskId);
            setShowPopup(false);
        }
        else {
            const newTasks = tasks.map((task) => {
                if (task.id === editTaskId) {
                    if (task.title === inputValue) 
                        return task;
                    else {
                        task.title = inputValue;
                        task.date = `Edited at: ${new Date().toLocaleDateString(
                            undefined, {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                        })}`;
                    }
                }
                return task;
            });
            setTasks(newTasks);
            setShowPopup(false);
        }
    }
    
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setShowPopup(false);    
        }
        else if (event.key === 'Enter'){
            if (inputValue.trim() === '') {
                // deleteTask(editTaskId);
                setShowPopup(false);
            }
            else
                closeEditTask();
        }
    }
    // const mouseClick = (event) => {
    //     if (!document.querySelector('.edit-task-input').contains(event.target) &&
    //         !document.querySelector('.list-group').contains(event.target) &&
    //         event.target.className !== 'edit-icon' )
    //     {
    //         closeEditTask();
    //     }
    // }
    useEffect(() => {
        if (showPopup) {
            document.addEventListener('keydown', handleKeyDown);
            // document.addEventListener('click', mouseClick);
            return () => {
                document.removeEventListener('keydown' , handleKeyDown);
                // document.removeEventListener('click', mouseClick);
            }
        }
    }, );

    return (
        <>
            {showPopup && (
                <EditTask
                    showPopup={showPopup}
                    dark={dark}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    closeEditTask={closeEditTask}
                />
            )}
            <TaskInput
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                addTask={addTask}
            />
            <Tasks
                tasks={tasks}
                deleteTask={deleteTask}
                onDone={onDone}
                openEditTask={openEditTask}
                emptyPhoto={emptyPhoto} 
            />
        </>
    );
}
export default Input;