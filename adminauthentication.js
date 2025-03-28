import { db } from "./firebase.js"; // Import Firestore instance
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Login Form Submission
document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission refresh

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let messageBox = document.getElementById("message-box");

    if (!messageBox) {
        console.error("❌ ERROR: message-box element not found!");
        return;
    }

    try {
        const adminRef = collection(db, "admin");
        const querySnapshot = await getDocs(adminRef);

        let validUser = false;

        querySnapshot.forEach((doc) => {
            let data = doc.data();
            if (data.username === username && data.password === password) {
                validUser = true;
            }
        });

        if (validUser) {
            console.log("✅ Login successful! Redirecting...");
            localStorage.setItem("loggedInUser", username);

            messageBox.textContent = "✅ Login successful! Redirecting...";
            messageBox.style.color = "green";
            messageBox.style.display = "block";

            setTimeout(() => {
                console.log("Redirecting now...");
                window.location.href = "adminpage.html";
            }, 2000);
        } else {
            console.log("❌ Invalid username or password.");
            messageBox.textContent = "❌ Invalid username or password.";
            messageBox.style.color = "red";
            messageBox.style.display = "block";
        }
    } catch (error) {
        console.error("🔥 Error checking Firestore:", error);
        messageBox.textContent = "⚠️ An error occurred. Please try again.";
        messageBox.style.color = "orange";
        messageBox.style.display = "block";
    }
});


