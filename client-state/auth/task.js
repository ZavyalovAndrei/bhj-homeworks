const form = document.getElementById("signin__form");
const formContainer = document.getElementById("signin");
const welcome = document.getElementById("welcome");
const id = document.getElementById("user_id");
const input = document.querySelectorAll(".row");
let localStorageId = JSON.parse(localStorage.getItem("auth"));


if (localStorageId) {
  makeWelcomeActive(localStorageId);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const formData = new FormData(form);
  xhr.addEventListener("load", () => {});
  xhr.open("POST", form.action);
  xhr.send(formData);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const responce = JSON.parse(xhr.responseText);
      if (responce.success) {
        localStorage.setItem("auth", JSON.stringify(responce.user_id));
        makeWelcomeActive(responce.user_id);
      } else {
        alert("Неверный логин/пароль");
        e.target.reset();
      }
    }
  };
});

function makeWelcomeActive(idValue) {
  id.textContent = idValue;
  welcome.classList.add("welcome_active");
  formContainer.classList.remove("signin_active");
  welcome.insertAdjacentHTML(
    "afterEnd",
    '<div class="row"><button class="btn btn_logout" id="logout__btn">Выйти</button></div>'
  );
  const logoutButton = document.getElementById("logout__btn");
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcome.classList.remove("welcome_active");
    formContainer.classList.add("signin_active");
    localStorage.removeItem("auth");
    logoutButton.parentNode.removeChild(logoutButton);
  });
}

