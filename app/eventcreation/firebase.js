import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";

// Initialize Firebase
import {auth, db, app} from "../firebase-auth";


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