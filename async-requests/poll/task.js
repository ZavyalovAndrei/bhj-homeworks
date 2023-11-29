const pollTitle = document.getElementById("poll__title");
const pollAnswers = document.getElementById("poll__answers");

const xhrGet = new XMLHttpRequest();
xhrGet.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");
xhrGet.send();
xhrGet.onreadystatechange = function () {
  if (xhrGet.readyState === 4) {
    const responseGet = JSON.parse(xhrGet.responseText);
    pollTitle.insertAdjacentText("afterbegin", responseGet.data.title);
    let answersButtons = null;
    [...responseGet.data.answers].forEach((answer) => {
      if (answersButtons === null) {
        answersButtons = '<button class="poll__answer">' + answer + "</button>";
      } else {
        answersButtons =
          answersButtons +
          '<button class="poll__answer">' +
          answer +
          "</button>";
      }
    });
    pollAnswers.insertAdjacentHTML("afterbegin", answersButtons);
    pollAnswers.addEventListener("click", (event) => {
      event.preventDefault();
      const buttonValue = event.target.textContent;
      alert("Спасибо, ваш голос засчитан!");
      const xhrPost = new XMLHttpRequest();
      xhrPost.open(
        "POST",
        "https://students.netoservices.ru/nestjs-backend/poll"
      );
      xhrPost.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhrPost.send(
        "vote=" +
          responseGet.id +
          "&answer=" +
          [...responseGet.data.answers].indexOf(buttonValue)
      );
      xhrPost.onreadystatechange = function () {
        if (xhrPost.readyState === 4) {
          const responsePost = JSON.parse(xhrPost.responseText);
          
          while (pollAnswers.firstChild) {
            pollAnswers.removeChild(pollAnswers.firstChild);
          }

          let stat = null;
          [...responsePost.stat].forEach((element) => {
            if (stat === null) {
              stat =
                '<div class="stat__answer">' +
                element.answer +
                ": " +
                element.votes +
                "%</div>";
            } else {
              stat =
                stat +
                '<div class="stat__answer">' +
                element.answer +
                ": " +
                element.votes +
                "%</div>";
            }
          });
          pollAnswers.insertAdjacentHTML("afterbegin", stat);
        }
      };
    });
  }
};