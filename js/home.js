const welcome = document.getElementById("username");
const logoutBtn = document.querySelector(".logout-btn");
let loggedUserName;


if (localStorage.getItem("loggedUserName") !== null) {
    loggedUserName = localStorage.getItem("loggedUserName");
    welcome.innerHTML = `Welcome ${loggedUserName}`;
}
else {
    location.href = "./index.html";
}

logoutBtn.addEventListener("click", logout)

function logout() {
    localStorage.removeItem("loggedUserName");
}


