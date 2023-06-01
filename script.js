let NewDate = document.getElementById("date");
let item = document.getElementById("task-items");


setInterval(() => {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  NewDate.innerHTML = `${hour}:${minutes}:${seconds}s`;

}, 1000);

// Function to add a new task
function addTask() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let value = document.getElementById("msg").value;
  let taskElement = document.createElement("div");
  taskElement.classList.add("task-main");
  taskElement.innerHTML = `<p id="tasks">${value} | Updated At ${hour}:${minutes}</p><i id="cross" class="ri-add-line"></i>`;
  item.appendChild(taskElement);

  let cross = taskElement.querySelector("#cross");
  cross.addEventListener("click", () => {
    taskElement.remove();
    saveTasks();
  });

  // Scroll to the newly added element
  taskElement.scrollIntoView({ behavior: "smooth", block: "end" });

  // Save tasks to local storage
  saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  let tasks = Array.from(item.children).map((taskElement) => taskElement.innerHTML);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    tasks = JSON.parse(tasks);
    tasks.forEach((task) => {
      let taskElement = document.createElement("div");
      taskElement.classList.add("task-main");
      taskElement.innerHTML = task;
      item.appendChild(taskElement);

      let cross = taskElement.querySelector("#cross");
      cross.addEventListener("click", () => {
        taskElement.remove();
        saveTasks();
      });
    });
  }
}

// Load tasks from local storage when the page loads
window.addEventListener("load", loadTasks);

// Event listener for click on "Post" button
let post = document.getElementById("Post");
post.addEventListener("click", () => {
  addTask();
});

// Event listener for Enter key press
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
