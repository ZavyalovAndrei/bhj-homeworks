const progress = document.getElementById("progress");
const file = document.getElementById("file");
const upload = document.forms.form;
const fileName = upload.querySelector(".input__wrapper-desc");
const xhr = new XMLHttpRequest();

file.addEventListener("change", () => {
  fileName.textContent = file.value;
  progress.value = 0;
});

upload.addEventListener("submit", (event) => {
  event.preventDefault();

  xhr.upload.onprogress = (event) => {
    progress.value = event.loaded / event.total;
  };
  xhr.onloadend = () => {
    if (xhr.status == 201) {
      alert(`Success!`);
    } else {
      const response = JSON.parse(xhr.responseText);
      alert(
        "Upload error - " + response.statusCode + " (" + response.message + ")"
      );
    }
  };

  xhr.open("POST", upload.action);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(new FormData(upload));
});
