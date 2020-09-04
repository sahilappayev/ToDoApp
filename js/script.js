// UI Values

const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const btnAddNewTask = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');

// call event listeners
eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewTask);

    // delete a task event
    taskList.addEventListener('click', deleteTask);

    // delete all event
    btnDeleteAll.addEventListener("click", deleteAll);
}

// add new task
function addNewTask(e) {
    if (input.value === '') {
        alert('Add any new task')
    }
    else {
        // craete li
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary capitalize';
        // li.textContent = input.value;
        li.appendChild(document.createTextNode(input.value));

        // create a
        const a = document.createElement('a');
        a.className = 'delete-item float-right';
        a.href = '#';
        a.innerHTML = '<i class="fas fa-times"></i>';

        // add a to li
        li.appendChild(a);

        // add li to ul
        taskList.appendChild(li);

        // clear input
        input.value = '';
    }
    e.preventDefault();
}

// delete a task
function deleteTask(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
    }

    e.preventDefault();
}

// delete all
function deleteAll(e){
    if(confirm("Are you shure to delete all tasks?")){
        taskList.innerHTML = '';
        // taskList.childNodes.forEach(function(item){
        //     if(item.nodeType === 1){
        //         item.remove();
        //     }
        // })
    }
    
    e.preventDefault();
}