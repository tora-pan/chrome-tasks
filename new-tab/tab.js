console.log('tab.js is running!');
const squares = document.querySelector('.squares');
for (var i = 1; i < 365; i++) {
    const level = Math.floor(Math.random() * 3);
    squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
}

var todoList = document.getElementById('todo-list');

const completeItem = (e) => {
    const item = e.target.parentNode;
    if (e.target.checked) {
        var currentDate = new Date();
        var key = formatDate(currentDate);
        item.classList.remove('complete');
        removeTask(key, item.textContent);
    } else {
        addTaskWithDate(item.textContent);
        item.classList.add('complete');
    }
    addTaskWithDate(item.textContent);
};

// Function to add a new task
function addTask(taskName) {
    console.log('adding: ', taskName);
    var listItem = document.createElement('li');
    listItem.className = 'todo-item';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', completeItem);

    var label = document.createElement('label');
    label.textContent = taskName;

    listItem.appendChild(label);
    listItem.appendChild(checkbox);

    todoList.appendChild(listItem);
}

// Example: Add some initial tasks
addTask('Study Japanese');
addTask('Learn something new');

// Function to add a new task with date
function addTaskWithDate(taskName) {
    var currentDate = new Date();
    var formattedDate = formatDate(currentDate);

    var taskObject = {
        date: formattedDate,
        task: taskName,
    };

    // Save the task to localStorage with the key as the formatted date
    saveTask(formattedDate, taskObject);
}

// Function to save a task to localStorage, avoiding duplicates
function saveTask(key, taskObject) {
    // Retrieve existing tasks or initialize an empty array
    var existingTasks = JSON.parse(localStorage.getItem(key)) || [];

    // Check if the task already exists based on the task name
    var isDuplicate = existingTasks.some(function (existingTask) {
        return existingTask.task === taskObject.task;
    });

    // If it's not a duplicate, add the new task to the array
    if (!isDuplicate) {
        existingTasks.push(taskObject);

        // Save the updated tasks array back to localStorage
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
    var existingTasks = JSON.parse(localStorage.getItem(key)) || [];

    // Find the index of the task with the specified name
    var indexToRemove = existingTasks.findIndex(function (existingTask) {
        return existingTask.task === taskName;
    });

    // If the task is found, remove it from the array
    if (indexToRemove !== -1) {
        existingTasks.splice(indexToRemove, 1);

        // Save the updated tasks array back to localStorage
        localStorage.setItem(key, JSON.stringify(existingTasks));

        console.log('Task removed:', taskName);
    } else {
        console.log('Task not found:', taskName);
    }
}

// Function to format a date as mm/dd/yyyy
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-based
    var year = date.getFullYear();

    // Ensure two digits for day and month
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return month + '/' + day + '/' + year;
}
