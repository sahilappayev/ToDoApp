// UI Values

const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const btnAddNewTask = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
// const items = ["item 1", "item 2", "item 3", "item 4"]
let items = [];


// load items from local storage

loadItems(items);

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



function loadItems(items) {
    items = getItemsFromLS();
    if (items != null) {
        items.forEach(function (item) {
            createItem(item);
        })
    }
}

function createItem(item) {
    // craete li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary capitalize';
    // li.textContent = input.value;
    li.appendChild(document.createTextNode(item));

    // create a
    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.href = '#';
    a.innerHTML = '<i class="fas fa-times"></i>';

    // add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);
}

// get items from local storage

function getItemsFromLS() {
    if (localStorage.getItem("items") != null) {
        items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
}

// set items to local storage

function setItemsToLS(item) {
    items = getItemsFromLS();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

// delete item from local storage

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function(item, index){
        if(item === text){
            items.splice(index, 1);
        }
    });
    localStorage.setItem("items", JSON.stringify(items));
}



// add new task
function addNewTask(e) {
    if (input.value === '') {
        alert('Add any new task')
    } else {

        // add to tasks list
        createItem(input.value);

        // save to local storage
        setItemsToLS(input.value);

        // clear input
        input.value = '';
    }
    e.preventDefault();
}

// delete a task
function deleteTask(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm("Are you shure to delete this task?")) {
            e.target.parentElement.parentElement.remove();

            // delete from local storage
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }

    e.preventDefault();
}

// delete all
function deleteAll(e) {
    if (confirm("Are you shure to delete all tasks?")) {
        // taskList.innerHTML = '';
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
       localStorage.removeItem("items");
    }

    e.preventDefault();
}