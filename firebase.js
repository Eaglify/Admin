// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyZlSFc6qvRFtzEetf6sPNti9iwNjgT9w",
    authDomain: "eaglify-18dec.firebaseapp.com",
    projectId: "eaglify-18dec",
    storageBucket: "eaglify-18dec.appspot.com",
    messagingSenderId: "610895699362",
    appId: "1:610895699362:web:b11ec003f88274d7a8a6fb",
    measurementId: "G-QB2WFMFL41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase objects
export { app, auth, db };
