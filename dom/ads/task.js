const className = 'rotator__case_active';
let interval = 1000;

function changeText() {
    const currentText = document.querySelector('.' + className);
    currentText.classList.remove(className);
    let nextElement = 0;
    if (currentText.nextElementSibling !== null) {
        nextElement = currentText.nextElementSibling;
    } else {
        nextElement = currentText.parentElement.firstElementChild;
    }
    nextElement.classList.add(className);
    interval = nextElement.dataset.speed;
    nextElement.style.color = nextElement.dataset.color;
}

setInterval(() => {changeText()}, interval);