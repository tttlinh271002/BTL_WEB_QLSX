let apiUser = "http://localhost:3000/user";
const btnSignUp = document.getElementById('form-input');
const username = document.getElementById('username');
const email = document.getElementById('email');
const name1 = document.getElementById('fullname');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const role = document.getElementsByName('role');
const plW = document.querySelector('select');

function getRole() {
    var roleValue = '';
    for (var i = 0; i < role.length; i++) {
        if (role[i].checked == true) {
            roleValue = role[i].value;
        }
    }
    return roleValue;
}

btnSignUp.addEventListener("click", e => {
    e.preventDefault();
    checkInputs();
    //console.log(checkUserExist(username));
    // console.log(getRole());
    console.log(plW.value);
});

function checkInputs() {
    // trim to remove the whitespaces
    const plWValue = plW.value;
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const nameValue = name1.value.trim();
    const phoneValue = phone.value.trim();
    const roleValue = getRole();
    var check = false;
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        check = false;
    } else if (checkUserExist(username)) {
        setErrorFor(username, 'Username already used');
        check = false;
    } else {
        check = true;
    }
    if (nameValue === '') {
        setErrorFor(name1, 'Full Name cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (!isPhoneNum(phoneValue)) {
        setErrorFor(phone, 'Phone must be number');
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
    if (roleValue == 'Branch') {
        if (plWValue === '') {
            // Error Here
            check = false;
        } else {
            check = true;
        }
    }
    if (password2Value === '') {
        setErrorFor(password2, 'Repass cannot be blank');
        check = false;
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
        check = false;
    } else {
        check = true;
    }
    if (check) {
        const user = {
            username: usernameValue,
            password: passwordValue,
            fname: nameValue,
            email: emailValue,
            phone: phoneValue,
            role: roleValue,
            workplace: plWValue,
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
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'input-field error';
    small.innerText = message;
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPhoneNum(phone) {
    return /^-?\d+$/.test(phone);
}

const getUser = async() => {
    const response = await fetch(apiUser);
    const data = await response.json();
    return data;
};
// Check if username already used
function checkUserExist(username) {
    var check = false;
    getUser().then((data) => {
        const user = data.find(
            (user) => user.username == username.value
        );
        if (user) {
            check = true;
        }
    });
    return check;
}



// Login