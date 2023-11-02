const tabsContainer = document.getElementById('tabs1');
const tabs = Array.from(document.querySelectorAll('.tab'));
const tabContents = Array.from(document.querySelectorAll('.tab__content'));
let contentIndex = 0;

tabsContainer.addEventListener('click', event => {
    contentIndex = tabs.indexOf(event.target);
    if (contentIndex >= 0 && contentIndex <=tabs.length) {
        switcher(contentIndex, tabs, 'tab_active');
        switcher(contentIndex, tabContents, 'tab__content_active')
    }
})
function switcher (index, array, className) {
    for (let i = 0; i < array.length; i++) {
        if (i === index) {
            array[i].classList.add(className);
        } else {
            array[i].classList.remove(className);
        }  
    }
}