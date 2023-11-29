const loader = document.getElementById("loader");
const items = document.getElementById("items");
const xhrGet = new XMLHttpRequest();
xhrGet.open(
  "GET",
  "https://students.netoservices.ru/nestjs-backend/slow-get-courses"
);

if (localStorage.length > 0) {
    loader.classList.remove("loader_active");
    loadData();
  }

xhrGet.send();
xhrGet.onreadystatechange = function () {
  if (xhrGet.readyState === 4) {
    loader.classList.remove("loader_active");
    while (items.firstChild) {
      items.removeChild(items.firstChild);
    }
    const responseData = JSON.parse(xhrGet.responseText);
    const valuteData = responseData.response.Valute;
    localStorage.clear();
    for (let key of Object.keys(valuteData)) {
      localStorage.setItem('"' + key + '"', '"' + valuteData[key].Value + '"');
    }
    loadData();
  } 
};

function loadData() {
  for (let key of Object.keys(localStorage)) {
    const charCode = key.replace(/"/g, "");
    const value = localStorage.getItem(key).replace(/"/g, "");
    items.insertAdjacentHTML(
      "afterBegin",
      '<div class="item"><div class="item__code">' +
        charCode +
        '</div><div class="item__value">' +
        value +
        '</div><div class="item__currency">руб.</div></div>'
    );
  }
}
