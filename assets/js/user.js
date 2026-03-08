//    Login / User Info
const userInfo = document.querySelector('#user_info');
const userName = document.querySelector('#user');
const links = document.querySelector('#links');

if (
    localStorage.getItem('fristName') &&
    localStorage.getItem('lastName')
) {
    userName.textContent =
        `${localStorage.getItem('fristName')} ${localStorage.getItem('lastName')}`;
    userInfo.style.display = "flex";
    links.style.display = "none";
} else {
    userInfo.style.display = "none";
    links.style.display = "flex";
}

/* Logout */
const logout = document.querySelector('#logout');
if (logout) {
    logout.addEventListener("click", () => {
        localStorage.clear();
        alert("Log out successfully");
        window.location = "index.html";
    });
}
