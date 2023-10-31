const timeToSeconds = function() {
    const startTime = document.getElementById("timer");
    const fullTimer = startTime.textContent.split(":")
    const fullTimerInSeconds = (fullTimer[0] * 3600) + (fullTimer[1] * 60) + ( + fullTimer[2]);
    startTime.textContent = timerCheck(fullTimerInSeconds);
}

const timerCheck = function(timerSeconds){
    if (+timerSeconds === 0) {
        clearInterval(timer);
        window.location.href = "https://inkscape.org/gallery/item/42333/inkscape-1.3_2023-07-21_0e150ed6c4-x64_31XBEKV.msi";
        alert("Вы победили в конкурсе!");
    } else{  
        timerSeconds--;
        const hours = Math.trunc(timerSeconds / 3600);
        const minutes = Math.trunc((timerSeconds - (hours * 3600)) / 60);
        const seconds = timerSeconds - (hours * 3600) - (minutes * 60);
        return hours.toString().padStart(2, '0')
        + ':' + minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');
    }
}

let timer = setInterval(timeToSeconds , 1000);