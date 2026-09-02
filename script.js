const inputBox = document.getElementById("input-box");
const addButton = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskText = inputBox.value.trim();

    if (!taskText) {
        alert("You must write something!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteButton = document.createElement("span");
    deleteButton.textContent = "×";
    deleteButton.className = "delete-btn";

    li.appendChild(deleteButton);
    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

addButton.addEventListener("click", addTask);

inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".delete-btn");

    if (deleteButton) {
        deleteButton.closest("li").remove();
        saveData();
        return;
    }

    const clickedItem = event.target.closest("li");

    if (!clickedItem) {
        return;
    }

    clickedItem.classList.toggle("checked");
    saveData();
});

function saveData() {
    localStorage.setItem("todoData", listContainer.innerHTML);
}

function showTask() {
    const savedTasks = localStorage.getItem("todoData");

    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
}

showTask();
