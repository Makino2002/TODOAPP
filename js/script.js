function tasks() {
  this.listTask = [];
  this.idCounter = 0;
}

tasks.prototype.addTask = function () {
  const tasksName = document.getElementById("inputValue").value.trim();
  if (tasksName !== "") {
    if (this.listTask.filter((task) => tasksName === task.name).length === 0) {
      const filterStatus = document.getElementById("filter").value;
      let newTask = {
        id: ++this.idCounter,
        name: tasksName,
        completed: filterStatus === "done",
      };
      this.listTask.push(newTask);
      this.cancelTask();
      this.sortTask();
      this.filterTask();
      ////
    } else {
      alert("already have this task");
      cancelTask();
    }
  }
};

tasks.prototype.render = function (listArray) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  taskList.innerHTML = listArray
    .map((item) => {
      return ` <li><input onchange="newTaskList.toggleCompleted(${
        item.id
      })" type="checkbox" ${item.completed ? "checked" : ""}>
              <span>${item.name}</span>
              <button class="button" onclick="newTaskList.editTask(${
                item.id
              })">Edit</button>
              <button class="button" onclick="newTaskList.deleteTask(${
                item.id
              })">Delete</button>
              </li>`;
    })
    .join("");
};

tasks.prototype.cancelTask = function () {
  document.getElementById("inputValue").value = "";
};

tasks.prototype.deleteTask = function (id) {
  this.listTask.filter((item, index) =>
    item.id === id ? this.listTask.splice(index, 1) : ""
  );
  this.render(this.listTask);
};

tasks.prototype.editTask = function (id) {
  const task = this.listTask.find((task) => task.id === id);
  const newTaskName = prompt("Chang your task here", task.name);
  if (
    newTaskName !== null &&
    newTaskName !== task.name &&
    newTaskName.trim() !== ""
  ) {
    const isTaskExist = this.listTask.find(
      (task) => task.name === newTaskName.trim()
    );
    console.log(newTaskName);
    console.log(isTaskExist);

    if (isTaskExist) {
      alert("Already have a task");
    } else {
      task.name = newTaskName.trim();
      this.render(this.listTask);
    }
  }
};
tasks.prototype.filterTask = function () {
  const filterStatus = document.getElementById("filter").value;
  const listTask = document.getElementById("listTask");
  if (filterStatus === "done") {
    this.render(
      this.listTask.filter((value) => {
        if (value.completed === true) {
          return value;
        }
      }, [])
    );
  } else if (filterStatus === "undone") {
    this.render(
      this.listTask.filter((value) => {
        if (value.completed === false) {
          return value;
        }
      }, [])
    );
  } else {
    this.render(this.listTask);
  }
};
tasks.prototype.toggleCompleted = function (id) {
  this.listTask.forEach((item) =>
    item.id === id ? (item.completed = !item.completed) : ""
  );
};

tasks.prototype.sortTask = function () {
  this.listTask.sort((tasks1, tasks2) => {
    if (tasks1.completed != tasks2.completed) {
      return tasks1.completed - tasks2.completed;
    }
    return !isNaN(tasks1.name) && !isNaN(tasks2.name)
      ? tasks1.name - tasks2.name
      : tasks1.name.localeCompare(tasks2.name);
  });
};

let newTaskList = new tasks();

document
  .getElementById("addButton")
  .addEventListener("click", () => newTaskList.addTask());
document
  .getElementById("cancelButton")
  .addEventListener("click", () => newTaskList.cancelTask());
document
  .getElementById("filter")
  .addEventListener("change", () => newTaskList.filterTask());
