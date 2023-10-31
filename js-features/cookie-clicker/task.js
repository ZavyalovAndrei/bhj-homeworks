const clickerCounter = document.getElementById("clicker__counter");
const cookieImg = document.getElementById("cookie");
const clickSpeed = document.getElementById("clicks__per__second");
let timer = new Date();
cookieImg.onclick = function() {
    if (+cookieImg.width <= 200) {
        cookieImg.width = "300";
    } else {
        cookieImg.width ="200";
    }
    const currentTime = new Date();
    clickSpeed.textContent = (1000/(currentTime - timer)).toFixed(3);
    timer = currentTime;
    clickerCounter.textContent++;
}