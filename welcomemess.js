import { db } from "./firebase.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

window.onload = function () {
    console.log("Script Loaded!");

    // Get the stored username from localStorage
    let username = localStorage.getItem("loggedInUser");
    console.log("Retrieved Username:", username);

    // Get the welcome message div
    let welcomeMessage = document.getElementById("welcome-message");
    let nameContainer = document.getElementById("name-container"); // Updated ID

    // Check if elements exist before modifying
    if (!welcomeMessage || !nameContainer) {
        console.error("Error: Required elements not found!");
        return;
    }

    // Set default message if username is not found
    if (!username || username.trim() === "") {
        welcomeMessage.innerHTML = "Welcome to Eaglify!";
        nameContainer.innerHTML = "Welcome to Eaglify!";
        console.log("Default message set.");
        return;
    }

    // Set the welcome message based on the username
    if (username === "admin") {
        welcomeMessage.innerHTML = "Welcome to Eaglify, Financial Advisors";
        fetchDevelopersImage(nameContainer);
    } else if (username === "Sabas") {
        welcomeMessage.innerHTML = "Welcome to Eaglify, Mr. Agra!";
        fetchSabasImage(nameContainer);
    } else {
        welcomeMessage.innerHTML = `Welcome to Eaglify, ${username}!`;
        fetchDevelopersImage(nameContainer);
    }

    console.log("Welcome message updated!");
};

// Function to fetch Sabas' name and image
async function fetchSabasImage(nameContainer) {
    try {
        console.log("Fetching data for Sabas...");

        // Query Firestore document
        const userDocRef = doc(db, "admin", "Head admin");  
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("User Data from Firestore:", userData);

            // Create an image element
            const img = document.createElement("img");
            img.src = "assets/Sir Pic.png"; // Image for Sabas
            img.alt = "Sir Pic";
            img.style.width = "80px";  
            img.style.height = "80px";
            img.style.marginLeft = "10px";
            img.style.borderRadius = "50%"; // Circular image

            // Update the name container with name and image
            nameContainer.innerHTML = `${userData.name}`;
            nameContainer.appendChild(img);

            console.log(`Firebase Name Retrieved: ${userData.name}`);
        } else {
            console.warn("No document found for Sabas!");
        }
    } catch (error) {
        console.error("Error fetching name from Firebase:", error);
    }
}

// Function to fetch Developers image
function fetchDevelopersImage(nameContainer) {
    console.log("Setting Developers image...");

    // Create an image element
    const img = document.createElement("img");
    img.src = "assets/FA_pic.jpg"; // Default image for non-Sabas users
    img.alt = "Developers Image";
    img.style.width = "100px";  
    img.style.height = "100px";
    img.style.marginLeft = "10px";
    img.style.borderRadius = "50%"; // Circular image

    // Update the name container with image only
    nameContainer.innerHTML = "Financial Advisors";
    nameContainer.appendChild(img);

    console.log("Developers image set.");
}
