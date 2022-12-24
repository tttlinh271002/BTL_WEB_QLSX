const username_login = document.getElementById('loginuser');
const password_login = document.getElementById('loginpass');
const btnLogin = document.getElementById('form-login');
btnLogin.addEventListener("click", e => {
    e.preventDefault();
    checkLogin();
})

function checkLogin() {
    const usernameValue = username_login.value.trim();
    const passwordValue = password_login.value.trim();
    var check = false;
    if (usernameValue === '') {
        setErrorFor(username_login, 'Username cannot be blank');
        check = false;
    } else if (passwordValue === '') {
        setErrorFor(password_login, 'Password cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (check) {
        getUser().then((data) => {
            const user = data.find(
                (user) =>
                user.username == usernameValue && user.password == passwordValue
            );
            if (user) {
                if (user.workplace == 'Agent') {
                    window.location.href = "\Home Page\Agent\agent.html";
                }
                if (user.workplace == 'Factory') {
                    window.location.href = "\Home Page\Factory\factory.html";
                }
                if (user.workplace == 'Warranty') {
                    window.location.href = "\Home Page\Factory\warranty.html";
                }
                if (user.role == 'Manager') {
                    window.location.href = "\Home Page\Manager\warranty.html";
                }
            } else {
                alert("Login failed");
            }
        });
    }
}