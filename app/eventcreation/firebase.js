import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCOc_vqiavzeA680OdMIS0O-RQFUJmPZvg",
    authDomain: "attendanceapp-47a33.firebaseapp.com",
    projectId: "attendanceapp-47a33",
    storageBucket: "attendanceapp-47a33.firebasestorage.app",
    messagingSenderId: "115705009188",
    appId: "1:115705009188:web:2707954dbce6eefff9b4b1",
    measurementId: "G-SCDK7E0N2T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function logout() {
    signOut(auth).then(() => {
        console.log("User signed out successfully.");
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
}

export async function createEvent(eventName) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User is not authenticated.");
        }

        const userID = user.uid;

        const eventRef = doc(db, `users/${userID}/events`, `${Date.now()}`);

        await setDoc(eventRef, {
            name: eventName,
            createdAt: new Date().toISOString()
        }).then(() => {
            alert("Event created successfully.");
            window.location.href = "./dashboard";
        });

        console.log("Event created successfully.");
    } catch (error) {
        console.error("Error creating event: ", error);
    }
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in


    } else {
        window.location.href = "./"







    }
});