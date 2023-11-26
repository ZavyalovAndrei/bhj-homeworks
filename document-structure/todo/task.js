const tasksList = document.getElementById("tasks__list");
const taskText = document.getElementById("task__input");
const taskAddButton = document.getElementById("tasks__add");
const removeTaskButton = (button) => {
  const delitedTask = button.target.closest(".task");
  const delitedLocalStorageTask =
    delitedTask.querySelector(".task__title").textContent;
  localStorage.removeItem('"' + delitedLocalStorageTask + '"');
  delitedTask.remove();
};

let keys = Object.keys(localStorage);
for (let key of keys) {
  addTask(localStorage.getItem(key).replace(/"/g, ""));
}

taskAddButton.addEventListener("click", () => {
  if (taskText.value) {
    addTask(taskText.value);
    localStorage.setItem(
      '"' + taskText.value + '"',
      '"' + taskText.value + '"'
    );
    taskText.value = "";
  }
});

function addTask(taskValue) {
  tasksList.insertAdjacentHTML(
    "beforeBegin",
    '<div class="task"><div class="task__title">' +
      taskValue +
      '</div><a href="#" class="task__remove">&times;</a></div>'
  );
  const removeTasks = document.querySelectorAll(".task__remove");
  removeTasks.forEach((button) =>
    button.addEventListener("click", removeTaskButton)
  );
}
