const messagesContainer = document.getElementById("messages-container");
const stickyHeader = document.querySelector(".sticky-header");

let lastScrollTop = 0;

messagesContainer.addEventListener("scroll", function () {
    let scrollTop = messagesContainer.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down, hide header
        stickyHeader.classList.add("hidden");
    } else {
        // Scrolling up, show header
        stickyHeader.classList.remove("hidden");
    }

    lastScrollTop = scrollTop;
});
