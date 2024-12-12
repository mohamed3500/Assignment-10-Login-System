const signupBtn = document.getElementById("signup-btn");
const signupNameInput = document.getElementById("signupName");
const signupEmailInput = document.getElementById("signupEmail");
const signupPasswordInput = document.getElementById("signupPassword");
const messageParagraph = document.getElementById("message");
const regexObject = {
    signupName: /^[\w ]{3,}$/,
    signupEmail: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
    signupPassword: /^.{8,}$/
}

let flagToTestForEmail = 0;

let usersArray = [];

if (localStorage.getItem("usersStorage") !== null) {
    usersArray = JSON.parse(localStorage.getItem("usersStorage"));
}

signupBtn.addEventListener("click", function () {
    if (!checkIfInputsAreEmpty()) {
        if (validateInputs(signupNameInput) && validateInputs(signupEmailInput) && validateInputs(signupPasswordInput)) {
            createUser();
        }
    }
    else {
        messageParagraph.style.color = "#dc3545";
        messageParagraph.innerHTML = "All Inputs are Required";
    }
});

function createUser() {
    let user = {
        userName: signupNameInput.value,
        userEmail: signupEmailInput.value.toLowerCase(),
        userPassword: signupPasswordInput.value
    }

    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].userEmail === signupEmailInput.value.toLowerCase()) {
            flagToTestForEmail = 1;
            break;
        }
    }
    if (flagToTestForEmail === 0) {
        usersArray.push(user);
        localStorage.setItem("usersStorage", JSON.stringify(usersArray));
        messageParagraph.style.color = "#28a745";
        messageParagraph.innerHTML = "Account Created";
        window.open("./index.html", "_self")
    }
    else {
        flagToTestForEmail = 0;
        messageParagraph.style.color = "#dc3545";
        messageParagraph.innerHTML = "Email Already Exists";
    }

}

function checkIfInputsAreEmpty() {
    if (signupNameInput.value === "" || signupEmailInput.value === "" || signupPasswordInput.value === "") {
        return true;
    }
    else {
        return false;
    }
}

function validateInputs(inputElement) {
    if (regexObject[inputElement.id].test(inputElement.value)) {
        return true;
    }
    else {
        messageParagraph.style.color = "#dc3545";
        messageParagraph.innerHTML = `❌<br>
         🔴 Name Must be 3 or More Characters - Allowed Characters are Numbers, Letters, Underscores and Spaces<br>
         🔴 Email must be valid<br>
         🔴 Password must be 8 or more characters`;
    }
}