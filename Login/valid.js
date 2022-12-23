let apiUser = "http://localhost:3000/user";
const form = document.getElementById('form-input');
const username = document.getElementById('username');
const email = document.getElementById('email');
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function returnRole() {
    var e = document.getElementsByName('role');
    for (i = 0; i < e.length; i++) {
        if (e[i].checked) {
            return e[i].value;
        }
    }
}
const role = returnRole();
form.addEventListener('click', e => {
    e.preventDefault();
    checkInputs();
});

function createUser() {
    const user = {
        username: username.value,
        password: password.value
    };
    fetch(apiUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((res) => res.json())
        .then((data) => console.log(data));
    window.location.href = "index.html";
}

function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    var check = false;
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        check = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        check = false;
    } else {
        check = true;
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        check = false;
    } else {
        check = true;
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Password2 cannot be blank');
        check = false;
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
        check = false;
    } else {
        check = true;
    }
    if (check) {
        createUser();
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'input-field error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-field success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}