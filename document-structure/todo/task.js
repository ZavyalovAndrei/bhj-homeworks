const tasksList = document.getElementById("tasks__list");
const taskText = document.getElementById("task__input");
const taskAddButton = document.getElementById("tasks__add");
let localStorageArray = JSON.parse(localStorage.getItem("todo")) || [];

tasksList.addEventListener("click", (e) => {
  e.preventDefault();
  const delitedTask = e.target.closest(".task");
  const delitedLocalStorageTask =
    delitedTask.querySelector(".task__title").textContent;
  const delitedIndex = localStorageArray.indexOf(delitedLocalStorageTask);
  localStorageArray.splice(delitedIndex, 1);
  localStorage.setItem("todo", JSON.stringify(localStorageArray));
  delitedTask.remove();
});

localStorageArray.forEach((task) => addTask(task.replace(/"/g, "")));

taskAddButton.addEventListener("click", (e) => {
  e.preventDefault();
  const taskTextTrim = taskText.value.trim(" ");
  if (taskTextTrim) {
    addTask(taskTextTrim);
    localStorageArray.push(taskTextTrim);
    localStorage.setItem("todo", JSON.stringify(localStorageArray));
    taskText.value = "";
  }
});

function addTask(taskValue) {
  tasksList.insertAdjacentHTML(
    "afterBegin",
    '<div class="task"><div class="task__title">' +
      taskValue +
      '</div><a href="#" class="task__remove">&times;</a></div>'
  );
}
