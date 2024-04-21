function EditTask(props) {
    return (
        <div className="popup">
            <div className={`edit-task-input swal-overlay--show-modal
            ${props.showPopup ? 'active' : ''}
            ${props.dark ? 'dark' : 'light'}`}>
                <form
                    className="edit-form"
                    onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                    <input
                        className=" form-control form-control-lg"
                        type="text"
                        autoComplete="off"
                        value={props.inputValue}
                        onChange={(e) => {
                            e.preventDefault();
                            props.setInputValue(e.target.value);
                        }}
                    />
                </form>
                <h4
                    onClick={props.closeEditTask}
                >Done</h4>
            </div>
        </div>
    )
}
export default EditTask;