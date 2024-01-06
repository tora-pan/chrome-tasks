const squares = document.querySelector('.squares');
for (var i = 1; i < 365; i++) {
    const level = Math.floor(Math.random() * 3);
    squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
}

var todoList = document.getElementById('todo-list');

const getTodaysList = () => {
    const key = formatDate(new Date());
    const storage = JSON.parse(localStorage.getItem(key));
    console.log('storage: ', storage);
    return storage || [];
};

const completeItem = (e) => {
    const item = e.target.parentNode;
    if (!e.target.checked) {
        item.classList.remove('complete');
    } else {
        // addTaskWithDate(item.textContent);
        item.classList.add('complete');
    }
};

const trashItem = (e) => {
    const item = e.target.parentNode;
    const taskName = item.textContent;
    const key = formatDate(new Date());
    removeTask(key, taskName);
    item.remove();
};

// Function to add a new task
function addTask(taskName) {
    var newTodo = document.getElementById('new-todo-input').value;
    var listItem = document.createElement('li');
    listItem.className = 'todo-item';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', completeItem);

    const trash = document.createElement('button');
    trash.className = 'trash';
    trash.addEventListener('click', trashItem);

    var label = document.createElement('label');
    label.textContent = taskName;

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(checkbox);
    listItem.appendChild(trash);

    todoList.appendChild(listItem);
    addTaskWithDate(newTodo);
    closeModal();
}

// Function to add a new task with date
function addTaskWithDate(taskName) {
    var currentDate = new Date();
    var formattedDate = formatDate(currentDate);

    var taskObject = {
        date: formattedDate,
        task: taskName,
    };

    saveTaskToLocalStorage(formattedDate, taskObject);
}

// Function to save a task to localStorage, avoiding duplicates
function saveTaskToLocalStorage(key, taskObject) {
    var existingTasks = getTodaysList();
    if (existingTasks.length === 0) {
        console.log('here');
        existingTasks.push(taskObject);
        localStorage.setItem(key, JSON.stringify(existingTasks));
        return;
    }

    var isDuplicate = existingTasks.some((existingTask) => {
        return existingTask.task === taskObject.task;
    });

    if (!isDuplicate) {
        console.log('adding: ', taskObject.task);
        console.log('key: ', key);
        existingTasks.push(taskObject);
        localStorage.setItem(key, JSON.stringify(existingTasks));
    } else {
        console.log('Task already exists:', taskObject.task);
    }
}

// Function to remove a task from localStorage
function removeTask(key, taskName) {
    console.log('removing: ', taskName);
    console.log('key: ', key);
    // Retrieve existing tasks or initialize an empty array
    var existingTasks = getTodaysList();
    console.log(existingTasks);
    // Find the index of the task with the specified name
    var item = existingTasks.some((existingTask) => {
        console.log('existingTask: ', existingTask);
        console.log('taskName: ', taskName);
        return existingTask.task === taskName;
    });
    console.log('item', item);

function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-based
    var year = date.getFullYear();

    // Ensure two digits for day and month
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return month + '/' + day + '/' + year;
}

const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const addBtn = document.getElementById('addBtn');

saveBtn.addEventListener('click', addTask);
cancelBtn.addEventListener('click', closeModal);
addBtn.addEventListener('click', openModal);

function openModal() {
    console.log('openModal');
    // Show the modal and overlay
    document.getElementById('modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeModal() {
    // Hide the modal and overlay
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    // Clear the input field
    document.getElementById('new-todo-input').value = '';
}

const addToList = (item) => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', completeItem);

    const trash = document.createElement('button');
    trash.className = 'trash';
    trash.addEventListener('click', trashItem);

    const label = document.createElement('label');
    label.textContent = item;

    listItem.appendChild(label);
    listItem.appendChild(checkbox);
    listItem.appendChild(trash);

    todoList.appendChild(listItem);
};

function populateList(key) {
    // Clear the todo list
    document.getElementById('todo-list').innerHTML = '';
    // Retrieve existing tasks or initialize an empty array
    var existingTasks = JSON.parse(localStorage.getItem(key)) || [];

    // Loop through tasks and add them to the todo list
    existingTasks.forEach((task) => {
        console.log(task.task);
        addToList(task.task);
        // addTask(task.task);
    });
}

populateList(formatDate(new Date()));
