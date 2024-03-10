let darkSwitch = document.querySelector('.dark-switch');
window.localStorage.darkMode === 'true'

darkSwitch.addEventListener('click', function() {
    if(window.localStorage.darkMode === 'true'){
        window.localStorage.setItem('darkMode', 'false');
        darkSwitch.removeAttribute('checked');
        document.body.setAttribute('data-bs-theme', 'light');

    }
    else{
        darkSwitch.setAttribute('checked' , '');
        window.localStorage.setItem('darkMode', 'true');
        document.body.setAttribute('data-bs-theme', 'dark');
    }
});


let addBtn = document.getElementById('button-addon2');
let taskTitle = document.querySelector('.title');
let taskInput = document.getElementById('task');
let listGroup = document.querySelector('.list-group');
let clearBtn = document.getElementById('clear');
let tasksArray = [];

// checks if there are tasks in the local storage
if(window.localStorage.tasks){
    tasksArray = JSON.parse(window.localStorage.tasks);
    for(let i of tasksArray){
        addTaskTpage(i.taskValue , i.taskTitle , i.dateAdded);
    }
}

function addTaskToArray(taskValue , taskTitle , addedDate) {
    let newTask = {
        taskTitle: taskTitle,
        taskValue: taskValue,
        dateAdded: addedDate,
        id: new Date().getTime(),
    }
    tasksArray.push(newTask);
    addTaskTpage(taskValue , taskTitle ,addedDate);
}

function addTaskTpage(taskValue , taskTitle , dateAdded){

    let parent = document.createElement('a');
    parent.classList.add('list-group-item' , 'list-group-item-action' );
    
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('d-flex', 'w-100', 'justify-content-between');
    
    let taskName = document.createElement('h4');
    taskName.classList.add('mb-1');
    taskName.innerText = `${taskTitle}`;

    let taskDate = document.createElement('small');
    taskDate.innerText = `added in: ${dateAdded}`; 
    
    let flexDiv = document.createElement('div');
    flexDiv.classList.add('flex');

    let trashIcon = document.createElement('i');
    trashIcon.classList.add('fa' , 'fa-trash');

    let taskText = document.createElement('p');
    taskText.classList.add('mb-1');
    taskText.style.display = 'none';
    taskText.innerText = taskValue;

    let detailsDiv = document.createElement('div');
    
    let checkBoxLabel = document.createElement('label');
    checkBoxLabel.classList.add('form-check-label');

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('form-check-input' , 'done');

    checkBoxLabel.appendChild(checkBox);

    flexDiv.appendChild(taskDate);
    flexDiv.appendChild(trashIcon);

    detailsDiv.classList.add('details');
    detailsDiv.appendChild(taskText);
    detailsDiv.appendChild(flexDiv);

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(checkBoxLabel)

    parent.appendChild(taskDiv);
    parent.appendChild(detailsDiv);
    
    document.querySelector('.list-group').appendChild(parent);
}

// window.localStorage.clear();     
addBtn.addEventListener('click', function() {
    if (!taskTitle.value) {
        taskTitle.classList.add('is-invalid');
    }
    else{
        let taskTitleValue = taskTitle.value;
        let taskValue = taskInput.value;
        let addedDate = new Date().toLocaleString();

        addTaskToArray(taskValue , taskTitleValue , addedDate);
        window.localStorage.tasks = JSON.stringify(tasksArray);  
        
        taskInput.value = '';
        taskTitle.value = '';

        taskInput.classList.remove('is-invalid');
        taskTitle.classList.remove('is-invalid');       
    }
});

function handleKeyPress(element){
    element.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            event.preventDefault();
            addBtn.click();
            element.blur();
        }
    });
};

handleKeyPress(taskTitle);
handleKeyPress(taskInput);


listGroup.addEventListener('mousedown', function(event){
    if(event.detail >= 1){
        let task = event.target.closest('a');
        // deleteTask();
        if(event.target.classList.contains('fa-trash')){
            let deleteTarget = event.target.parentElement.children[0].innerText;
            for(let everyTask of tasksArray){
                if(everyTask.dateAdded === deleteTarget.slice(10)){
                    tasksArray.splice(tasksArray.indexOf(everyTask), 1);
                    window.localStorage.tasks = JSON.stringify(tasksArray);
                }
            }
            task.style.opacity = '0';
            task.style.height = '0';
            task.style.padding = '0';
            task.style.margin = '0';
            setTimeout(() => {
                task.remove();}
            , 500);
        }
        else if(event.target.type === 'checkbox'){
            return;
        }
        //collapse the task 
        else if(task.classList.contains('active')){
            task.classList.remove('active');
            task.children[1].style.visibility = 'hidden';
            task.children[1].style.opacity = '0';
            task.style.height = '50px';

        }
        //expand the task
        else{
            task.classList.add('active');
            task.children[1].children[0].style.display = 'block';
            task.children[1].style.visibility = 'visible';
            task.children[1].style.opacity = '1';
            task.style.height = +task.scrollHeight + 25 + "px";
        }
    }
});





