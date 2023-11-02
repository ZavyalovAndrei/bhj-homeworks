let button = document.querySelector('.dropdown__value');
const dropdownList = document.querySelector('.dropdown__list');
let dropdownListHide = true;
const dropdownLinks = Array.from(document.querySelectorAll('.dropdown__link'));

button.addEventListener('click', () => {
    if (dropdownListHide) {
        dropdownList.classList.add('dropdown__list_active');
        dropdownListHide = false;
    }else{
        hideDropdownListFunction();
    }
});

dropdownList.addEventListener('click', event => {
    event.preventDefault();
    button.textContent = dropdownLinks[(dropdownLinks.indexOf(event.target))].textContent;
    hideDropdownListFunction();
})

function hideDropdownListFunction() {
    dropdownList.classList.remove('dropdown__list_active');
    dropdownListHide = true;
}