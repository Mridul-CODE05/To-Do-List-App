const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const submitButton = document.getElementById("submit-button");

let tasks = [];
let editingTaskId = null;

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const listItem = document.createElement("li");

        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Pending" : "Complete";

        completeButton.addEventListener("click", () => {
            toggleTask(task.id);
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            editTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        listItem.append(
            taskText,
            completeButton,
            editButton,
            deleteButton
        );

        taskList.appendChild(listItem);
    });
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    if (editingTaskId !== null) {

        const task = tasks.find((item) => item.id === editingTaskId);

        task.text = text;

        editingTaskId = null;
        submitButton.textContent = "Add Task";

    } else {

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.push(newTask);
    }

    taskInput.value = "";

    displayTasks();
});

function editTask(id) {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    taskInput.value = task.text;

    editingTaskId = id;

    submitButton.textContent = "Update Task";

    taskInput.focus();
}

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);

    if (editingTaskId === id) {
        editingTaskId = null;
        taskInput.value = "";
        submitButton.textContent = "Add Task";
    }

    displayTasks();
}

function toggleTask(id) {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    task.completed = !task.completed;

    displayTasks();
}
