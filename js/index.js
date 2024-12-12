const loginBtn = document.getElementById("login-btn");
const signinEmailInput = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
const incorrectMsg = document.getElementById("incorrect");
let loggedUserName;
let successFlag = 0;

let usersArray = [];

if (localStorage.getItem("usersStorage") !== null) {
    usersArray = JSON.parse(localStorage.getItem("usersStorage"));
}

loginBtn.addEventListener("click", function () {

    if (!checkIfInputsAreEmpty()) {
        checkUserExists();
    }
    else {
        incorrectMsg.innerHTML = "All Inputs are Required";
        incorrectMsg.classList.remove("d-none");
    }
});

function checkUserExists() {
    let i;
    for (i = 0; i < usersArray.length; i++) {
        if (usersArray[i].userEmail === signinEmailInput.value.toLowerCase() && usersArray[i].userPassword === signinPassword.value) {
            loggedUserName = usersArray[i].userName;
            console.log(loggedUserName);
            localStorage.setItem("loggedUserName", loggedUserName);
            window.open("./home.html", "_self");
            break;
        }
        else if (usersArray[i].userEmail === signinEmailInput.value.toLowerCase() && usersArray[i].userPassword !== signinPassword.value) {
            incorrectMsg.innerHTML = "Incorrect Password";
            incorrectMsg.classList.remove("d-none");
            break;
        }
    }
    if (i === usersArray.length) {
        incorrectMsg.innerHTML = "Email Not Found";
        incorrectMsg.classList.remove("d-none");
    }

}

function checkIfInputsAreEmpty() {
    if (signinEmailInput.value === "" || signinPassword.value === "") {
        return true;
    }
    else {
        return false;
    }
}