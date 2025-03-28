import { getFirestore, collection, onSnapshot, deleteDoc, doc, getDoc, query, orderBy } 
    from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { db } from "./firebase.js";

function fetchMessagesRealtime() {
    console.log("Listening for real-time updates...");

    const container = document.getElementById("messages-container");
    if (!container) {
        console.error("Element #messages-container not found!");
        return;
    }

    const messagesRef = collection(db, "users");
    const q = query(messagesRef, orderBy("timestamp", "desc"));

    // Listen for changes in Firestore collection
    onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
            console.log("No messages found.");
            container.innerHTML = "<p>No messages found.</p>";
            return;
        }

        let messagesHTML = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Updated message:", data);

            messagesHTML += `
            <div class="message-card" data-id="${doc.id}">
                <p><strong>Name:</strong> ${data.name || "Unknown"}</p>
                <div class="message-header">
                    <p><strong>Email:</strong> ${data.email || "N/A"}</p>
                    <p class="message-date"><strong>Date:</strong> ${data.date || "Unknown date"}</p>
                </div>
                <p><strong>Message:</strong> ${data.message || "No message provided."}</p>
            </div>`;
        });

        container.innerHTML = messagesHTML;

        // Attach event listener to each message card
        document.querySelectorAll(".message-card").forEach(card => {
            card.addEventListener("click", function() {
                const messageId = this.getAttribute("data-id");
                openPopup(messageId);
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchMessagesRealtime(); // Start real-time message listener

    // Attach event listeners to buttons
    document.getElementById("cancel-btn").addEventListener("click", closePopup);
    document.getElementById("submit-reply-btn").addEventListener("click", submitReply);
});

// Function to open the popup and set the message ID
async function openPopup(messageId) {
    try {
        // Fetch message data from Firestore
        const messageDocRef = doc(db, "users", messageId);
        const messageDoc = await getDoc(messageDocRef);

        if (!messageDoc.exists()) {
            alert("Message not found.");
            return;
        }

        const data = messageDoc.data(); // Get sender's data

        // Set popup attributes and values
        document.getElementById("message-popup").setAttribute("data-id", messageId);
        document.getElementById("sender-email").value = data.email || "";  // ✅ Fetch email correctly
        document.getElementById("reply-message").value = "";
        document.getElementById("message-popup").style.display = "flex";

    } catch (error) {
        console.error("Error fetching message details:", error);
        alert("Failed to load message details.");
    }
}


document.getElementById("delete-btn").addEventListener("click", async () => {
    const messageId = document.getElementById("message-popup").getAttribute("data-id");

    if (!messageId) {
        alert("No message selected.");
        return;
    }

    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
        await deleteDoc(doc(db, "users", messageId));
        alert("Message deleted successfully!");
        document.getElementById("message-popup").style.display = "none";
    } catch (error) {
        console.error("Error deleting message: ", error);
        alert("Failed to delete the message.");
    }
});

// Function to close the popup
function closePopup() {
    document.getElementById("message-popup").style.display = "none";
}

// Function to submit reply
async function submitReply() {
    console.log("Submit button clicked!");

    const replyMessage = document.getElementById("reply-message").value;
    const messageId = document.getElementById("message-popup").getAttribute("data-id");

    if (!replyMessage.trim()) {
        alert("Please enter a reply before submitting.");
        return;
    }

    try {
        // Fetch the original message data from Firestore
        const messageDocRef = doc(db, "users", messageId);
        const messageDoc = await getDoc(messageDocRef);

        if (!messageDoc.exists()) {
            alert("Message not found.");
            return;
        }

        const data = messageDoc.data(); // Get sender's name and email

        if (!data.email) {
            alert("Recipient email is missing!");
            return;
        }

        // EmailJS parameters
        let params = {
            name: data.name || "User",  // Fallback if name is missing
            message: replyMessage,
            to_email: data.email // Dynamically send to the recipient
        };

        // Send email using EmailJS
        emailjs.send("service_gzdkbo7", "template_yzamx1g", params)
            .then((response) => {
                console.log("Email sent successfully!", response);
                alert(`Reply sent to ${data.email}: ${replyMessage}`);
                closePopup();
            })
            .catch((error) => {
                console.error("Error sending email:", error);
                alert("Failed to send email. Please try again.");
            });

    } catch (error) {
        console.error("Error fetching message details: ", error);
        alert("An error occurred. Please try again.");
    }
}