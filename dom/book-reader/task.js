const book = document.querySelector('#book');
const bookContainer = document.querySelectorAll('.book__control a');
const bookClasses = {'font-size':'book_fs-', 'text':'book_color-', 'bg':'book_bg-'};

for (let i = 0; i < bookContainer.length; i++) {
    bookContainer[i].addEventListener('click', event => {
        event.preventDefault();
        const arrayName = event.target.parentElement.classList[1];
        const activeClassName = event.target.classList[0] + '_active';
        const currentControlArray = Array.from(document.querySelectorAll('.' + arrayName + ' a'));
        const currentIndex = currentControlArray.indexOf(event.target);
        buttonSwitcher(currentIndex, currentControlArray, activeClassName);
        bookSwitcher(currentIndex, currentControlArray);
    }) 
}

function buttonSwitcher(index, array, className) {
    for (let i = 0; i < array.length; i++) {
        if (i === index) {
            array[i].classList.add(className);
        } else {
            array[i].classList.remove(className);
        }  
    }
}

function bookSwitcher(index, array) {
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i].classList[1] !== 'undefined'){
            const elementsName = array[i].classList[1].split('_');
            const elementProperty = elementsName[elementsName.length - 1];
            const item = elementsName[0];
            const bookClass = bookClasses[item] + elementProperty;
            book.classList.remove(bookClass);
            if (i === index &&  elementProperty !== 'active'){
                book.classList.add(bookClass);
            }    
        }
    }
}
