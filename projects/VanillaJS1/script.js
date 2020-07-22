const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//email validation
const validateEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, 'Email is not valid');
    }
}

const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

const checkLengthU = (input, min, max) => {
    if(input.value.length < min) {
        showError(input, 
            `${getFieldName(input)} must be at least ${min} characters long`)
    }
    else if(input.value.length > max) {
        showError(input,
            `${getFieldName(input)} must be maximum ${max} characters long`);
    }
    else {
        showSuccess(input);
    }
}

const checkLengthP = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters long`);
    }
    else {
        showSuccess(input);
    }
}

const checkPasswordsMatch = (a, b) => {
    if(a.value !== b.value) {
        showError(b, 'Passwords do not match');
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkLengthU(username, 4, 21);
    checkLengthP(password, 6);
    validateEmail(email);
    checkPasswordsMatch(password, password2);
});