const lost = document.getElementById("lost");
const dead = document.getElementById("dead");
const holesQuantity = 9;
const deadToWin = 10;
const lostToGameOver = 5;

for (let i = 1; i < holesQuantity; i++) {
    const element = document.getElementById((`hole${i}`))
    element.onclick = function() {
        if (element.className.includes("hole_has-mole")) {
            dead.textContent++;
        } else {
            lost.textContent++;   
        }
        if (lost.textContent >= lostToGameOver) {
            alert("Вы проиграли. Игра окончена");
            lost.textContent = 0;
            dead.textContent = 0;
        }
        if (dead.textContent >= deadToWin) {
            alert("Поздравляю! Вы выиграли.");
            lost.textContent = 0;
            dead.textContent = 0;
        }
    }
}

