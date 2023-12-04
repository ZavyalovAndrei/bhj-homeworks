const key = "popup";
const popup = document.getElementById("subscribe-modal");
const modalClose = popup.querySelector(".modal__close");

if (!getCookie()) {
  popup.classList.add("modal_active");
  popup.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target === modalClose) {
      setCookie();
      popup.classList.remove("modal_active");
    }
  });
}

function setCookie() {
  document.cookie = key + "=" + encodeURIComponent("true");
}

function getCookie() {
  try {
    const pairs = document.cookie.split("; ");
    const result = pairs.find((p) => p.startsWith(key + "="));
    return result.substring(key.length + 1);
  } catch {
    return false;
  }
}
