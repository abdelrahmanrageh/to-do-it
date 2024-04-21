import React, { useState } from 'react';
import swal from 'sweetalert';
import sound from './media/sound.mp3';

function Task(props) {
    const [opened, setOpened] = useState(false);
    const [done, setDone] = useState(props.task.done);
    const audio = new Audio(sound);
    audio.volume = 0.3;
    audio.preload = 'auto';
    
    const confirmDelete = (deleteFun) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal("Your task has been deleted!", {
                    icon: "success",
                });
                deleteFun();
            }
        })
    }

    return (
        <div className={`list-group ${opened ? 'active' : ''} preloaded`}>
            <input
                type="checkbox"
                className="form-check-input done"
                checked = {props.task.done}
                onChange={(e) => {
                    e.stopPropagation();
                    props.onDone(props.task.id);
                    setDone(!done);
                    if(!done) {
                        audio.play();
                    }
                }}
            />
            <div className={`list-group-item list-group-item-action ${opened ? 'active' : ''} bg-transparent`}
                onClick={(e) => {
                    if (!window.getSelection().toString()) {
                        e.preventDefault();
                        setOpened(!opened);
                    }
                }}
            >
                <div className="d-flex w-100 justify-content-between"
                >
                <h4 className={`mb-1 ${opened ? 'active' : ''} ${done? 'taskDone' : ''}` }>{props.task.title}</h4>
                </div>
                <div className="details" >
                    <p className={`mb-1`}>{props.task.details} </p>
                    <div className="flex">
                        <small>{props.task.date}</small>
                        <div className='icons-div'>
                            
                            <svg
                                title='Edit'
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.onEdit(props.task.id);
                                }}                     
                                className='edit-icon'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"><path fill="#ffffff"
                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                            
                            <i
                                title='Delete'
                                className="fa fa-trash"
                                onClick={(e) => {
                                    e.preventDefault();
                                    confirmDelete(props.onDelete);
                                }}    
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Task;