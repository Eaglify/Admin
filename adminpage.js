document.addEventListener("DOMContentLoaded", function () {
    const logoutElements = document.querySelectorAll("#logout, #logoutLink");

    logoutElements.forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            const confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                window.location.href = "index.html"; // Redirect to login page
            }
        });
    });
});
