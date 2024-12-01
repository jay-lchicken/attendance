import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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