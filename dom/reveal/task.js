function update() {
    const reveal = document.querySelectorAll('.reveal');
    
    reveal.forEach(element => {
        if (element.getBoundingClientRect().bottom > 2*window.screen.height/5 && element.getBoundingClientRect().bottom < 3*window.screen.height/5) {
            element.classList.add('reveal_active');
        } else {
            element.classList.remove('reveal_active');
        } 
    });
}
document.addEventListener('scroll', update);
update();