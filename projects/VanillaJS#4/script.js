const menuBtn = document.querySelector('#menuOpen');
const closeBtn = document.querySelector('#sidebar-close');
const signUpBtn = document.querySelector('#submitBtn');
const closeForm = document.querySelector('#close');
const modal = document.querySelector('#sign-form');

menuBtn.addEventListener('click', () => {
    document.body.classList.toggle('show-nav');
});

closeBtn.addEventListener('click', () => {
    if(document.body.classList.contains('show-nav')) {
        document.body.classList.remove('show-nav');
    }
});

signUpBtn.addEventListener('click', () => {
    document.querySelector('#sign-form').classList.add('show-modal');
});

closeForm.addEventListener('click', () => {
    document.querySelector('#sign-form').classList.remove('show-modal');
})

window.addEventListener('click', e => {
    e.target == modal ? modal.classList.remove('show-modal'): false;
})