const editor = document.getElementById('editor');
const key = 'text-editor';
editor.insertAdjacentHTML(
  'afterEnd',
  '</div><div class="clear-button" id="clear-button">Очистить</div></div>'
);

const clearButton = document.getElementById('clear-button');

if (localStorage.getItem(key)) {
  editor.value = localStorage.getItem(key);
}
editor.addEventListener('change', () => {
  localStorage.setItem(key, editor.value);
});

clearButton.addEventListener('click', () => {
    localStorage.removeItem(key);
    editor.value = '';
})