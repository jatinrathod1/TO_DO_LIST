const tasks = [];

// Load tasks from local storage if available
const storedTasks = JSON.parse(localStorage.getItem("tasks"));
if (storedTasks) {
    tasks.push(...storedTasks);
}

function addTask() {
    const taskInput = document.getElementById("task");
    const importanceInput = document.getElementById("importance");
    const taskText = taskInput.value.trim();
    const importance = parseInt(importanceInput.value);

    if (taskText !== "" && !isNaN(importance) && importance >= 1 && importance <= 10) {
        tasks.push({ text: taskText, importance, completed: false });
        taskInput.value = "";
        importanceInput.value = "";
        renderTasks();
    }
}

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks() {
    const filter = document.getElementById("filter").value;
    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") {
            return !task.completed;
        } else if (filter === "completed") {
            return task.completed;
        } else {
            return true;
        }
    });
    renderTasks(filteredTasks);
}

function renderTasks(filteredTasks = tasks) {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
                <span>${task.text} (Importance: ${task.importance})</span>
                <button onclick="toggleTaskStatus(${index})">
                    ${task.completed ? "Uncomplete" : "Complete"}
                </button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
        tasksContainer.appendChild(taskElement);
    });

    // Store tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function shareOnWhatsApp() {
    const sharedText = "My To-Do List:\n\n" + tasks.map(task => `- ${task.text} (Importance: ${task.importance})`).join("\n");
    const whatsappURL = `whatsapp://send?text=${encodeURIComponent(sharedText)}`;
    window.open(whatsappURL);
}

function clearData() {
    // Clear all tasks and local storage data
    tasks.length = 0;
    localStorage.removeItem("tasks");
    renderTasks(); // Update the task list display
}

renderTasks();
