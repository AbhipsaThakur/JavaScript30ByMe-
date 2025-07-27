let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateProgress();
    }
};

const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
    <div class="taskItem">
        <div class="task">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} data-index="${index}" />
            <p class="${task.completed ? 'completed' : ''}">${task.text}</p>
        </div>
        <div class="icons">
            <img src="images/edit.png" alt="Edit" class="edit-icon" data-index="${index}" />
            <img src="images/bin.png" alt="Delete" class="delete-icon" data-index="${index}" />
        </div>
    </div>
`;

        taskList.appendChild(listItem);
    });

    // Add event listeners for checkboxes and delete icons
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', toggleTaskStatus);
    });

    document.querySelectorAll('.delete-icon').forEach(icon => {
        icon.addEventListener('click', deleteTask);
    });

    document.querySelectorAll('.edit-icon').forEach(icon => {
        icon.addEventListener('click', editTask);
    });

    updateProgress();
};

const toggleTaskStatus = (e) => {
    const index = e.target.getAttribute('data-index');
    tasks[index].completed = e.target.checked;
    updateTasksList();
};

const deleteTask = (e) => {
    const index = e.target.getAttribute('data-index');
    tasks.splice(index, 1);
    updateTasksList();
};

const updateProgress = () => {
    const progress = document.getElementById('progress');
    const numbers = document.getElementById('numbers');
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    progress.style.width = `${percentage}%`;
    numbers.textContent = `${completed} / ${total}`;
};
const editTask = (e) => {
    const index = e.target.dataset.index;
    const newText = prompt("Edit your task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTasksList();
    }
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
